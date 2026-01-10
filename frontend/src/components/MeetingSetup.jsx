import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function MeetingSetup({ setIsSetupComplete }) {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const navigate = useNavigate();

  const call = useCall();

  if (!call) {
    throw new Error("useCall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.camera.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-white">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Meeting Setup</h1>
        <p className="text-sm text-gray-400">
          Check your camera and microphone before joining
        </p>
      </div>

      <VideoPreview />

      <div className="h-px w-full sm:w-[80vw] bg-white/10 mt-4" />

      <div className="flex items-center justify-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-200">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            className="h-4 w-4 accent-orange-400"
          />
          <span>Join with mic and camera off</span>
        </label>

        <div className="relative">
          <DeviceSettings />
        </div>
      </div>

      <button
        className="bg-orange-400 text-black px-8 py-2 rounded-lg font-semibold hover:bg-orange-500 transition cursor-pointer"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </button>

      <button
        onClick={() => navigate("/home")}
        className="mt-2 rounded-md px-3 py-1 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-500 transition cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}

export default MeetingSetup;
