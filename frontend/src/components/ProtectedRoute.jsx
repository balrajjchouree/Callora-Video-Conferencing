import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import CalloraLoader from "../ui/CalloraLoader";
import { useAppLoading } from "../context/AppLoadingContext";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { appReady } = useAppLoading();

  if (!isLoaded) {
    return <CalloraLoader label="Preparing Callora…" />;
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {!appReady && <CalloraLoader label="Loading your workspace…" />}
      {children}
    </>
  );
};

export default ProtectedRoute;
