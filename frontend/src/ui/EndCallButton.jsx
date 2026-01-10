import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { AlignEndVertical, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MeetingModal from "../components/MeetingModal";
import { useState } from "react";

function EndCallButton() {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isMeetingOwner =
    localParticipant &&
    call?.state?.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endMeetingForAll = async () => {
    await call.endCall();
    navigate("/home");
  };
  return (
    <>
      <button
        className="
        bg-red-500 hover:bg-red-600
        p-3 rounded-full
        cursor-pointer
        transition
      "
        onClick={() => setOpen(true)}
      >
        <PhoneOff size={18} />
      </button>
      <MeetingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="End meeting for everyone?"
        buttonText="End Meeting"
        handleClick={endMeetingForAll}
        className="text-center"
      />
    </>
  );
}

export default EndCallButton;
