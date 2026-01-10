import { Link } from "react-router-dom";

function HelpPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 py-14">
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-4xl font-bold text-orange-400 drop-shadow-lg">
            Help & Support
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Everything you need to know to use{" "}
            <span className="text-orange-400 font-semibold">Callora</span> —
            from quick meetings to real-time collaboration.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "Getting Started with Callora",
              text: "Sign in to your account to access all features. From the dashboard, you can start instant meetings, schedule future calls, or enter your personal room.",
            },
            {
              title: "Starting or Joining a Meeting",
              text: "Start an instant meeting with one click, or join an existing meeting using an invitation link. Scheduled meetings appear automatically in your Upcoming section.",
            },
            {
              title: "Personal Room",
              text: "Your personal room is a permanent meeting space linked to your account. Share the link anytime and start meetings instantly without scheduling.",
            },
            {
              title: "Chat During Meetings",
              text: "Use the in-meeting chat to send messages, share updates, and communicate in real time while the call is active.",
            },
            {
              title: "Meeting Recordings",
              text: "Access your recorded meetings from the Recordings section. This helps you review discussions and important moments anytime.",
            },
            {
              title: "Camera or Microphone Issues",
              text: "If your camera or microphone is not working, check browser permissions and ensure no other app is using the device. You can also change devices before or during a meeting.",
            },
            {
              title: "Security & Authentication",
              text: "Callora uses secure authentication to protect your meetings. Only authenticated users can create rooms, access recordings, and manage personal spaces.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-gray-900/70 p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-orange-300 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-gray-900/70 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-orange-300 mb-2">
            Need More Help?
          </h2>
          <p className="text-gray-400 mb-3">
            Have questions, feedback, or ideas to improve Callora? We’d love to
            hear from you.
          </p>
          <p className="text-gray-300 text-sm">
            Contact us at{" "}
            <span className="text-orange-400 font-medium">
              support@callora.com
            </span>
          </p>
        </div>

        <div className="pt-8 text-center">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-orange-400 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
