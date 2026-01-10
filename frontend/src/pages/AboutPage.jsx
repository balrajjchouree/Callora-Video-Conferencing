import { Link, useNavigate } from "react-router-dom";
import CalloraLoader from "../ui/CalloraLoader";
import { useState } from "react";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";

function AboutPage() {
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    setIsNavigating(true);

    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }, 150);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="min-h-screen w-full backdrop-blur-md bg-black/60 px-6 sm:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-orange-400 mb-6 text-center drop-shadow-lg">
            About the Developer
          </h1>

          <p className="text-gray-300 text-lg mb-10 text-center leading-relaxed">
            Meet the mind behind{" "}
            <span className="text-orange-400 font-semibold">Callora</span> - a
            developer passionate about building modern, real-time communication
            experiences with smooth UI and powerful backend architecture.
          </p>

          <div className="bg-gray-900/70 px-4 py-6 sm:px-6 sm:py-8 rounded-2xl border border-gray-700 shadow-xl space-y-6">
            <div className="flex justify-center">
              <img
                src="/developer.jpg"
                alt="Developer"
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 shadow-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-orange-300 text-center">
              Balraj Choure
            </h2>

            <p className="text-center text-gray-5400 text-md">
              Crafting Real-Time, High-Performance Web Experiences
            </p>

            <p className="text-center text-gray-400 text-lg font-semibold">
              Full-Stack Developer • MERN • Web3 Hacker • Real-Time Systems
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4">
              <a
                href="https://github.com/balrajjchouree"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition text-sm font-medium"
              >
                <Github size={18} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/balrajjchouree/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition text-sm font-medium"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>

              <a
                href="https://balraj-s-portfolio.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition text-sm font-medium"
              >
                <Globe size={18} />
                Portfolio
              </a>

              <a
                href="https://twitter.com/balrajjchouree"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition text-sm font-medium"
              >
                <Twitter size={18} />
                Twitter
              </a>
            </div>

            <p className="text-gray-300 leading-relaxed text-[17px]">
              I am a dedicated Full-Stack Developer with a strong focus on
              real-time communication platforms. Building Callora allowed me to
              explore deep concepts of peer-to-peer video calling, WebRTC
              pipelines, and socket-based signaling systems.
              <br />
              <br />
              My development approach mixes clean UI/UX with scalable backend
              architecture - creating apps that are fast, intuitive, and built
              for real-world performance.
            </p>

            <div className="bg-gray-800/60 px-4 py-6 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-xl font-semibold text-orange-300 mb-3">
                Tech Stack & Expertise
              </h3>

              <ul className="text-gray-400 space-y-2">
                <li>• React.js (UI, State, Custom Hooks)</li>
                <li>• Node.js & Express (REST APIs, Auth, Scaling)</li>
                <li>• MongoDB (Schema Design, Indexing)</li>
                <li>• TailwindCSS (Modern, Responsive UI)</li>
                <li>• WebRTC (P2P media streams, STUN/TURN)</li>
                <li>• Socket.IO (real-time signaling & room control)</li>
                <li>• Peer-to-Peer Video/Audio flow architecture</li>
                <li>• Stream SDK (video infrastructure & scaling)</li>
              </ul>
            </div>

            <div className="bg-gray-800/60 px-4 py-6 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-xl font-semibold text-orange-300 mb-3">
                How Callora Video Meetings Work
              </h3>

              <p className="text-gray-300 leading-relaxed">
                • Users authenticate to access meetings and personal rooms.
                <br />• Meetings are created instantly or scheduled in advance.
                <br />• Stream SDK handles secure peer-to-peer media streaming.
                <br />• STUN/TURN servers ensure reliable connections.
                <br />• Real-time chat runs alongside live meetings.
                <br />• Recordings are accessible after meetings end.
                <br />
                <br />
                This approach ensures low latency, scalability, and a smooth
                meeting experience across devices.
              </p>
            </div>
          </div>

          <div className="text-gray-400 text-sm text-center pt-6">
            <button
              onClick={handleBack}
              className="hover:text-orange-400 transition cursor-pointer"
            >
              ← Previous page
            </button>
          </div>
        </div>
      </div>

      {isNavigating && <CalloraLoader label="Going back…" />}
    </div>
  );
}

export default AboutPage;
