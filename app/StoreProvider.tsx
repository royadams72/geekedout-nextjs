"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed
import { Persistor, persistStore } from "redux-persist";
import { getServerSideCookie } from "./functions";
import localStorage from "redux-persist/es/storage";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_SET_DATA_API } from "@/shared/constants/urls";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const [cookieValue, setCookieValue] = useState("");
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | any>(null);
  const [preloadedState, setPreloadedState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const clientSideSessionId = useRef<string | null>(null);
  const serverSideSession = useRef<string | undefined>(undefined);

  useEffect(() => {
    const getSessionIdFromStorage = async () => {
      try {
        clientSideSessionId.current = await localStorage.getItem("sessionId");
        serverSideSession.current = await getServerSideCookie("sessionId");
        setCookieValue(
          serverSideSession.current || (clientSideSessionId.current as any)
        );
      } catch (error) {
        console.error("Error fetching sessionId from localStorage", error);
      }

      try {
        const serverStore = await fetch(
          `${appConfig.url.BASE_URL}/${GET_SET_DATA_API}/category-get-data?getAll=true`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Cookie: `sessionId=${cookieValue}`,
            },
          }
        );

        if (!serverStore.ok) {
          throw new Error(`HTTP error! Status: ${serverStore.status}`);
        }

        const fetchedState = await serverStore.json();
        setPreloadedState(fetchedState);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSessionIdFromStorage();
  }, [cookieValue]);

  useEffect(() => {
    if (preloadedState && !storeRef.current) {
      storeRef.current = makeStore(preloadedState.state);
      persistorRef.current = persistStore(storeRef.current); // Initialize persistence
    }
  }, [preloadedState]);

  if (isLoading || !storeRef.current) {
    return <div>Loading...</div>; // You can replace this with a proper loading indicator
  }

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistorRef.current}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};
