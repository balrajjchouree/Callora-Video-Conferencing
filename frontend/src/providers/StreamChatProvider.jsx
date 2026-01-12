import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import CalloraLoader from "../ui/CalloraLoader";

const apiKey = import.meta.env.VITE_PUBLIC_STREAM_CHAT_API_KEY;

const chatClient = StreamChat.getInstance(apiKey);

const StreamChatProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const connect = async () => {
      if (chatClient.userID === user.id) {
        setReady(true);
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat/token`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      const data = await res.json();

      await chatClient.connectUser(
        {
          id: user.id,
          name: user.username || user.id,
          image: user.imageUrl,
        },
        data.token
      );

      setReady(true);
    };

    connect();

    return () => {
      chatClient.disconnectUser();
      setReady(false);
    };
  }, [user, isLoaded]);

  if (!ready) {
    return <CalloraLoader label="Connecting Chat..."/>
  }

  return (
    <Chat client={chatClient} theme="str-chat__theme-dark">
      {children}
    </Chat>
  );
};

export default StreamChatProvider;
