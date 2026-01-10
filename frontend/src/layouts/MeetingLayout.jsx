import { Outlet } from "react-router-dom";
import { useAppLoading } from "../context/AppLoadingContext";
import { useEffect } from "react";

function MeetingLayout() {
  const { setAppReady } = useAppLoading();

  useEffect(() => {
    setAppReady(true);
  }, [setAppReady]);
  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <Outlet />
    </div>
  );
}

export default MeetingLayout;
