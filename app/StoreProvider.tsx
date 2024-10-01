"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cookies } from "next/headers";
// import { getCookie } from "cookies-next";

import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed
import { Persistor, persistStore } from "redux-persist";
import { getSessionData } from "@/lib/redis/redis";
import { getServerSideCookie } from "./functions";
import { useClientSideCookies } from "@/lib/hooks/useClientSideCookie";
import { useServerSideCookie } from "@/lib/hooks/useServerSideCookie";
import localStorage from "redux-persist/es/storage";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_SET_DATA_API } from "@/shared/constants/urls";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const [cookieValue, setCookieValue] = useState("");
  const storeRef = useRef<AppStore | null | any>(null);
  const persistorRef = useRef<Persistor | any>(null);
  let preloadedState = useRef<any>(null);
  const clientSideSessionId = useRef<string | null>(null);
  const serverSideSession = useRef<string | undefined>(undefined);
  // let sessionId = useRef<string | null>(null);
  useEffect(() => {
    const getSessionIdFromStorage = async () => {
      try {
        clientSideSessionId.current = await localStorage.getItem("sessionId");
        serverSideSession.current = await getServerSideCookie("sessionId");
        // sessionId.current =
        //   serverSideSession.current || clientSideSessionId.current || null;
        // console.log(sessionId.current);

        // preloadedState.current = await getSessionData(
        //   serverSideSession.current as string
        // );
        console.log("sessionId from localStorage:", preloadedState.current);

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
        preloadedState.current = await serverStore.json();
        if (!serverStore.ok) {
          throw new Error(`HTTP error! Status: ${serverStore.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
      }
    };

    getSessionIdFromStorage(); // Call the async function inside useEffect
  }, [cookieValue]);
  // Promise {<fulfilled>: 'c4ad26db-2304-46fc-a68f-234752ef4f23'}
  // const serverCookie = useServerSideCookie();
  console.log("wyh==", preloadedState.current);

  // setCookieValue(÷local);
  useEffect(() => {}, []);
  // const local = JSON.parse(l) as string;
  // console.log("serverCookie==", serverCookie, "localStorageSession==", local);

  //   (await getSessionData(sessionId as string)) || undefined;

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // persistorRef.current = persistStore(storeRef.current); // Initialize persistence
  }

  return (
    <Provider store={storeRef.current}>
      {/* <PersistGate loading={null} persistor={persistorRef.current}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};
