import { useUser } from "@clerk/clerk-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingSetup from "../components/MeetingSetup";
import MeetingRoom from "../components/MeetingRoom";
import { useGetCallById } from "../hooks/useGetCallById";
import { useParams } from "react-router-dom";
import CalloraLoader from "../ui/CalloraLoader";

function MeetingPage() {
  const { meetingId } = useParams();
  const { isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(meetingId);

  if (isCallLoading || !isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <CalloraLoader label="Preparing your meeting…" />
      </div>
    );
  }

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Meeting not found
      </div>
    );
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default MeetingPage;
