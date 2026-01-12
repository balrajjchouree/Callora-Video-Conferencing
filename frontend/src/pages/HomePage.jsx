import { useEffect, useState } from "react";
import {
  Plus,
  UserPlus,
  CalendarDays,
  User,
} from "lucide-react";
import ActionCard from "../ui/ActionCard";
import MeetingModal from "../components/MeetingModal";
import { useUser } from "@clerk/clerk-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";

function HomePage() {
  const [time, setTime] = useState(new Date());
  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState(null);

  const navigate = useNavigate();

  const { user } = useUser();
  const client = useStreamVideoClient();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast.warning("Please select a valid date and time");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        navigate(`/meeting/${call.id}`);
      }

      toast.success("Your meeting is ready.");
    } catch (error) {
      console.log(error);
      toast.error("Unable to create the meeting. Please try again.");
    }
  };

  const MeetingLink = `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/${
    callDetails?.id
  }`;

  return (
    <section className="w-full max-w-7xl text-white space-y-6">
      <div className="relative rounded-2xl p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg ">
        <p className="absolute top-4 left-6 text-sm bg-white/20 px-3 py-1 rounded-full">
          Upcoming Meeting at 12:30 PM
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mt-6">{formattedTime}</h1>

        <p className="text-lg text-gray-300 mt-2">{formattedDate}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <ActionCard
          icon={<Plus size={26} />}
          title="New Meeting"
          description="Start an instant meeting now"
          bgColor="bg-orange-500"
          onClick={() => setMeetingState("isInstantMeeting")}
        />

        <ActionCard
          icon={<UserPlus size={26} />}
          title="Join Meeting"
          description="Join using an invitation link"
          bgColor="bg-blue-500"
          onClick={() => setMeetingState("isJoinMeeting")}
        />

        <ActionCard
          icon={<CalendarDays size={26} />}
          title="Schedule Meeting"
          description="Plan your meeting in advance"
          bgColor="bg-purple-600"
          onClick={() => setMeetingState("isScheduleMeeting")}
        />

        <ActionCard
          icon={<User size={26} />}
          title="Personal Room"
          description="Your own space for quick meetings"
          bgColor="bg-yellow-500"
          onClick={() => setMeetingState("isPersonalRoom")}
        />
      </div>

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
          buttonText="Schedule Meeting"
        >
          <div className="flex flex-col w-full items-start gap-2.5 mb-2.5">
            <label className="text-base font-normal leading-[22px] text-gray-400">
              Add a description
            </label>
            <textarea
              className="border-none w-full p-3 rounded-lg bg-gray-800 focus:outline-none"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex flex-col items-start gap-2.5">
            <label className="text-base font-normal leading-[22px] text-gray-400">
              Select Date & Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              wrapperClassName="w-full"
              className="w-full rounded-lg bg-gray-800 p-3 text-white focus:outline-none"
              popperClassName="z-50"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(MeetingLink);
            toast.success("Link Copied");
          }}
          image="/verified.png"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoinMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => {
          if (!values.link) {
            toast.error("Please enter a meeting link");
            return;
          }
          window.open(values.link);
        }}
      >
        <input
          placeholder="Meeting Link"
          className="border-none w-full p-3 rounded-lg bg-gray-800 focus:outline-none mt-1"
          onChange={(e) => {
            setValues({ ...values, link: e.target.value });
          }}
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isPersonalRoom"}
        onClose={() => setMeetingState(undefined)}
        title="Personal Room"
        buttonText="Enter Room"
        icon={User}
        handleClick={() => {
          setMeetingState(undefined);
          navigate("/personal-room");
        }}
      >
        <p>
          Your always-available private meeting room.
          <br />
          Start a meeting instantly or invite others anytime.
        </p>
      </MeetingModal>
    </section>
  );
}

export default HomePage;
