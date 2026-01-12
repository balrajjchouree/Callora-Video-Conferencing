import { useAuth } from "@clerk/clerk-react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  useChatContext,
} from "stream-chat-react";

function MeetingChat({ meetingId, onClose }) {
  const { client } = useChatContext();
  const { getToken } = useAuth();
  const [ready, setReady] = useState(false);

  const channel = client.channel("messaging", meetingId);

  useEffect(() => {
    if (!meetingId) return;

    const joinChannel = async () => {
      await fetch(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/chat/channel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({ meetingId }),
        }
      );

      setReady(true);
    };

    joinChannel();
  }, [meetingId]);

  if (!ready) {
    return (
      <CalloraLoader fullScreen="false" label="Connecting Chat..." size="8" />
    );
  }

  return (
    <div className="h-full px-4 py-6 sm:h-[85vh] flex flex-col show-scrollbar fixed sm:relative inset-0 sm:inset-auto z-50 sm:z-auto">
      <Channel channel={channel}>
        <Window>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-3 text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={24} />
            </button>
          )}
          <ChannelHeader />
          <MessageList />
          <MessageInput audioRecordingEnabled emojiPicker />
        </Window>
      </Channel>
    </div>
  );
}

export default MeetingChat;
