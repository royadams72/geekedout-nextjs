"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, initializeStore } from "@/lib/store"; // Adjust import as needed
import { persistStore } from "redux-persist";

interface Props {
  readonly children: ReactNode;
  preloadedState?: any;
}

export const StoreProvider = ({ children, preloadedState }: Props) => {
  const storeRef = useRef<AppStore | null | any>(null);
  const persistorRef = useRef<any>(null);

  if (!storeRef.current) {
    storeRef.current = initializeStore(preloadedState);
    persistorRef.current = persistStore(storeRef.current);
  }

  // Setup listeners once the store is initialized
  useEffect(() => {
    if (storeRef.current) {
      setupListeners(storeRef.current.dispatch);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
};
