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

interface Props {
  readonly children: ReactNode;
  preloadedState?: any;
}

export const StoreProvider = ({ children }: Props) => {
  const [cookieValue, setCookieValue] = useState("");
  // const local = window.localStorage.getItem("sessionId");
  // const cookieStore = useCookies();
  const serverCookie = useServerSideCookie();
  // setCookieValue(÷local);
  useEffect(() => {}, []);
  // const local = JSON.parse(l) as string;
  // console.log("serverCookie==", serverCookie, "localStorageSession==", local);

  //   (await getSessionData(sessionId as string)) || undefined;
  const storeRef = useRef<AppStore | null | any>(null);
  const persistorRef = useRef<Persistor | any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current); // Initialize persistence
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
};
