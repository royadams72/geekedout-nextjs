"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useRef } from "react";

import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed
import { Persistor, persistStore } from "redux-persist";

interface Props {
  readonly children: ReactNode;
  preloadedState?: any;
}

export const StoreProvider = ({ children, preloadedState }: Props) => {
  const storeRef = useRef<AppStore | null | any>(null);
  const persistorRef = useRef<Persistor | any>(null);

  if (!storeRef.current) {
    if (preloadedState) {
      storeRef.current = makeStore(preloadedState.state);
      console.log("preloadedState loaded==", preloadedState);
    } else {
      storeRef.current = makeStore();
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
