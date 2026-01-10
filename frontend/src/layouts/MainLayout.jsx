import { Outlet } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { useAppLoading } from "../context/AppLoadingContext";
import { useEffect } from "react";

function MainLayout() {
  const { setAppReady } = useAppLoading();

  useEffect(() => {
    setAppReady(true);
  }, [setAppReady]);
  return (
    <div
      className="
        h-screen w-screen
        bg-no-repeat bg-cover bg-center
        overflow-hidden
      "
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="fixed top-0 left-0 right-0 h-50 z-50">
        <HomeNavbar />
      </div>

      <main
        className="
          absolute top-27 sm:top-31 md:top-34 left-0 right-0 bottom-0
          overflow-y-auto no-scrollbar
          px-4 sm:px-8 md:px-16
          pb-6
        "
      >
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
