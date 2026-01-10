import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarClock, History, Video, User, Home } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import DeveloperIcon from "../ui/DeveloperIcon";

function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navBtnClass = (active) =>
    `flex flex-row items-center justify-center gap-2
     px-4 py-2 rounded-lg transition cursor-pointer
     ${
       active
         ? "bg-orange-400 text-black"
         : "bg-gray-800 hover:bg-gray-700 text-white"
     }`;

  return (
    <header className="bg-black/10 backdrop-blur-xs rounded-b-full">
      <nav className="flex items-center justify-between px-6 sm:px-8 md:px-12 py-4 relative z-10">
        <div>
          <img
            src="/callora-white.png"
            alt="Callora Logo"
            className="h-18 sm:h-22 md:h-25 cursor-grab"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="xl:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-6 text-white font-medium">
          <button
            onClick={() => navigate("/home")}
            className={navBtnClass(isActive("/home"))}
          >
            <Home size={20} />
            Home
          </button>
          <button
            onClick={() => navigate("/upcoming")}
            className={navBtnClass(isActive("/upcoming"))}
          >
            <CalendarClock size={20} />
            Upcoming
          </button>

          <button
            onClick={() => navigate("/previous")}
            className={navBtnClass(isActive("/previous"))}
          >
            <History size={20} />
            Previous
          </button>

          <button
            onClick={() => navigate("/recording")}
            className={navBtnClass(isActive("/recording"))}
          >
            <Video size={20} />
            Recordings
          </button>

          <button
            onClick={() => navigate("/personal-room")}
            className={navBtnClass(isActive("/personal-room"))}
          >
            <User size={20} />
            Personal Room
          </button>

          <DeveloperIcon
            to="/about"
            image="/developer.jpg"
            alt="Developer Profile"
          />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {isOpen && (
        <div className="flex flex-col xl:hidden items-center gap-4 text-white font-medium bg-black/70 backdrop-blur-xl border-b border-white/5 rounded-b-full py-4 px-6">
          <button
            onClick={() => handleNavigate("/home")}
            className={navBtnClass(isActive("/home"))}
          >
            <Home size={20} />
            Home
          </button>
          <button
            onClick={() => handleNavigate("/upcoming")}
            className={navBtnClass(isActive("/upcoming"))}
          >
            <CalendarClock size={20} />
            Upcoming
          </button>

          <button
            onClick={() => handleNavigate("/previous")}
            className={navBtnClass(isActive("/previous"))}
          >
            <History size={20} />
            Previous
          </button>

          <button
            onClick={() => handleNavigate("/recording")}
            className={navBtnClass(isActive("/recording"))}
          >
            <Video size={20} />
            Recordings
          </button>

          <button
            onClick={() => handleNavigate("/personal-room")}
            className={navBtnClass(isActive("/personal-room"))}
          >
            <User size={20} />
            Personal Room
          </button>

          <DeveloperIcon
            to="/about"
            image="/developer.jpg"
            alt="Developer Profile"
          />

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </header>
  );
}

export default HomeNavbar;
