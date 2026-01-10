import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { AppLoadingProvider } from "./context/AppLoadingContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppLoadingProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          theme: dark,
          variables: {
            colorBackground: "#0F172E",
            colorInputBackground: "#020617",
            colorText: "#FFFFFF",
            colorTextSecondary: "#CBD5E1",
            colorPrimary: "#F97316",
            colorDanger: "#EF4444",
            borderRadius: "12px",
          },
          elements: {
            userButtonAvatarBox: {
              width: "45px",
              height: "45px",
            },
          },
        }}
        afterSignOutUrl={"/"}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </AppLoadingProvider>
  </StrictMode>
);
