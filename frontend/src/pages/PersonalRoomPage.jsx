import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { useGetCallById } from "../hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CalloraLoader from "../ui/CalloraLoader";

const Table = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start">
      <h1 className="text-sm font-semibold text-gray-400 sm:min-w-36">
        {title}
      </h1>
      <p className="truncate text-sm font-medium text-white max-sm:max-w-[320px]">
        {description}
      </p>
    </div>
  );
};

const PersonalRoomPage = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId);
  const navigate = useNavigate();

  const [isStarting, setIsStarting] = useState(false);

  const startRoom = async () => {
    if (isStarting) return;
    if (!client || !user || !meetingId) return;

    try {
      setIsStarting(true);

      const newCall = client.call("default", meetingId);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      navigate(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to start meeting");
    } finally {
      setIsStarting(false);
    }
  };

  const meetingLink = `${
    import.meta.env.VITE_PUBLIC_BASE_URL
  }/meeting/${meetingId}?personal=true`;

  return (
    <section className="w-full max-w-7xl text-white space-y-8 sm:space-y-10">
      <div className="space-y-2 text-center xl:text-start">
        <h1 className="text-4xl font-bold tracking-tight">Personal Room</h1>
        <p className="text-gray-400 text-sm md:text-base">
          Your always-available private meeting room.
        </p>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="flex w-full flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" description={meetingId} />
        <Table title="Invite Link" description={meetingLink} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
        <button
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 transition cursor-pointer"
          onClick={startRoom}
          disabled={isStarting}
        >
          {isStarting ? (
            <CalloraLoader size="4" fullScreen={false} label="" />
          ) : (
            "Start Meeting"
          )}
        </button>

        <button
          className="rounded-lg bg-white/10 px-6 py-3 font-medium hover:bg-white/20 transition cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;
