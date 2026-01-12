import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutGrid, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EndCallButton from "../ui/EndCallButton";
import { MessageSquare } from "lucide-react";
import MeetingChat from "../ui/MeetingChat";
import { useChatContext } from "stream-chat-react";
import CalloraLoader from "../ui/CalloraLoader";

function MeetingRoom() {
  const [searchParams] = useSearchParams();
  const isPersonalRoom = searchParams.get("personal") === "true";
  const [layout, setLayout] = useState("speaker-right");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  const call = useCall();

  const { client } = useChatContext();

  useEffect(() => {
    if (!client || !call?.id) return;

    const channel = client.channel("messaging", call.id);

    const updateUnread = () => {
      const unread = channel.state?.unreadCount || 0;
      setUnreadCount(unread);
    };

    updateUnread();

    channel.on("message.new", updateUnread);
    channel.on("notification.mark_read", updateUnread);

    return () => {
      channel.off("message.new", updateUnread);
      channel.off("notification.mark_read", updateUnread);
    };
  }, [client, call.id]);

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <CalloraLoader label="Connecting you to the meeting…" />
      </div>
    );
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const changeLayout = (value) => {
    setLayout(value);
    setShowLayoutMenu(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-27vh)] sm:h-[calc(100vh-24vh)] mx-4 my-6 bg-black/80 backdrop-blur-lg px-4 py-6 sm:w-[320px] md:w-[380px] show-scrollbar fixed sm:relative inset-0 sm:inset-auto z-50 sm:z-auto  ${
            showParticipants ? "block" : "hidden"
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>

        {showChat && (
          <div className="h-[calc(100vh-86px)] ml-2 w-full sm:w-[320px] md:w-[380px]">
            <MeetingChat
              meetingId={call.id}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5 p-5 sm:p-0">
        <CallControls onLeave={() => navigate("/home")} />
        <button
          onClick={() => {
            setShowParticipants(false);
            setShowChat((prev) => !prev);
            setUnreadCount(0);
          }}
          className="relative bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
          title="Chat"
        >
          <MessageSquare size={18} />

          {unreadCount > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                bg-orange-500 text-black
                text-[10px] font-bold
                min-w-[18px] h-[18px]
                rounded-full
                flex items-center justify-center
              "
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowLayoutMenu((prev) => !prev)}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
            title="Change layout"
          >
            <LayoutGrid size={18} />
          </button>

          {showLayoutMenu && (
            <div className="absolute bottom-12 right-0 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => changeLayout("grid")}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 cursor-pointer"
              >
                Grid view
              </button>
              <button
                onClick={() => changeLayout("speaker-left")}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 cursor-pointer"
              >
                Speaker (Left)
              </button>
              <button
                onClick={() => changeLayout("speaker-right")}
                className="w-full px-4 py-2 text-left hover:bg-gray-700 cursor-pointer"
              >
                Speaker (Right)
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setShowChat(false);
            setShowParticipants((prev) => !prev);
          }}
          className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer"
        >
          <User size={18} />
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
}

export default MeetingRoom;
