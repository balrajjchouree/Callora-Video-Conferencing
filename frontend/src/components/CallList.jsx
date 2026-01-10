import { useNavigate } from "react-router-dom";
import { useGetCalls } from "../hooks/useGetCalls";
import { useEffect, useState } from "react";
import MeetingCard from "../ui/MeetingCard";
import { CalendarClock, History, Play, Video } from "lucide-react";
import { toast } from "react-toastify";
import CalloraLoader from "../ui/CalloraLoader";

function CallList({ type }) {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast.warning("Try again later");
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return callRecordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  const calls = type === "recordings" ? recordings : getCalls();
  const NoCalls = getNoCallsMessage();

  if (isLoading) {
    return <CalloraLoader label="Please wait a moment..."  />;
  }

  if (!calls.length) {
    return <div className="text-gray-400">{NoCalls}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting) => (
          <MeetingCard
            key={type === "recordings" ? meeting.url : meeting.id}
            icon={
              type === "ended"
                ? History
                : type === "upcoming"
                ? CalendarClock
                : Video
            }
            title={
              meeting?.state?.custom?.description ||
              meeting?.filename?.substring(0, 30) ||
              "Personal Meeting"
            }
            date={
              meeting?.state?.startsAt?.toLocaleString() ||
              meeting?.start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? Play : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => window.open(meeting.url, "_blank")
                : () => navigate(`/meeting/${meeting.id}`)
            }
            link={
              type === "recordings"
                ? meeting?.url
                : `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/${
                    meeting?.id
                  }`
            }
            type={type}
          />
        ))
      ) : (
        <h1 className="text-gray-400">{NoCalls}</h1>
      )}
    </div>
  );
}

export default CallList;
