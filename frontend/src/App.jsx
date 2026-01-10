import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import AboutPage from "./pages/AboutPage";
import UpComingPage from "./pages/UpComingPage";
import RecordingPage from "./pages/RecordingPage";
import PersonalRoomPage from "./pages/PersonalRoomPage";
import MainLayout from "./layouts/MainLayout";
import PreviousPage from "./pages/PreviousPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MeetingPage from "./pages/MeetingPage";
import MeetingLayout from "./layouts/MeetingLayout";
import StreamVideoProvider from "./providers/StreamClientProvider";
import StreamChatProvider from "./providers/StreamChatProvider";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        className="!p-2"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route
          element={
            <ProtectedRoute>
              <StreamVideoProvider>
                <StreamChatProvider>
                  <MainLayout />
                </StreamChatProvider>
              </StreamVideoProvider>
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/upcoming" element={<UpComingPage />} />
          <Route path="/previous" element={<PreviousPage />} />
          <Route path="/recording" element={<RecordingPage />} />
          <Route path="/personal-room" element={<PersonalRoomPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <StreamVideoProvider>
                <StreamChatProvider>
                  <MeetingLayout />
                </StreamChatProvider>
              </StreamVideoProvider>
            </ProtectedRoute>
          }
        >
          <Route path="/meeting/:meetingId" element={<MeetingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
