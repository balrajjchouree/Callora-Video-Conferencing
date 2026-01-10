import { createContext, useContext, useState } from "react";

const AppLoadingContext = createContext();

export const AppLoadingProvider = ({ children }) => {
  const [appReady, setAppReady] = useState(false);

  return (
    <AppLoadingContext.Provider value={{ appReady, setAppReady }}>
      {children}
    </AppLoadingContext.Provider>
  );
};

export const useAppLoading = () => useContext(AppLoadingContext);
