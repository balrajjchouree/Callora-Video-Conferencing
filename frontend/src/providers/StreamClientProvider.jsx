import { useUser } from "@clerk/clerk-react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const apiKey = import.meta.env.VITE_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API Key Missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: async () => {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/stream/token`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        return data.token;
      },
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
