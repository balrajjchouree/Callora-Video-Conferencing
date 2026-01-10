import { Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";

const RANDOM_IMAGES = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=6",
  "https://i.pravatar.cc/100?img=7",
  "https://i.pravatar.cc/100?img=8",
];

const getRandomImages = (count = 4) => {
  const shuffled = [...RANDOM_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function MeetingCard({
  icon: Icon,
  title,
  date,
  isPreviousMeeting = false,
  buttonIcon1: ButtonIcon,
  buttonText = "Join",
  handleClick,
  link,
  type,
}) {
  const avatars = getRandomImages(4);

  return (
    <section className="flex h-full w-full flex-col justify-between rounded-xl px-4 py-6 text-white bg-white/10 backdrop-blur-xs border border-white/20 shadow-lg">
      <article className="flex flex-col gap-3">
        {Icon && <Icon size={24} />}

        <div className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </article>

      <article className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        {type !== "recordings" && (
          <div className="relative flex items-center">
            {avatars.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="user"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-gray-700 object-cover"
                style={{ marginLeft: index === 0 ? 0 : -10 }}
              />
            ))}

            <div className="flex -ml-2 h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-800 text-[10px] sm:text-xs font-semibold">
              +5
            </div>
          </div>
        )}

        {!isPreviousMeeting && (
          <div className="flex flex-row gap-2 w-auto">
            <button
              onClick={handleClick}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-orange-400 text-black px-6 py-2 text-sm font-medium hover:bg-orange-500 transition cursor-pointer"
            >
              {ButtonIcon && <ButtonIcon size={16} />}
              {buttonText}
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700 transition cursor-pointer focus:border-none"
            >
              <LinkIcon size={16} />
              Copy Link
            </button>
          </div>
        )}
      </article>
    </section>
  );
}

export default MeetingCard;
