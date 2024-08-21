"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed
import { Persistor, persistStore } from "redux-persist";

interface Props {
  readonly children: ReactNode;
  preloadedState?: any;
}

export const StoreProvider = ({ children }: Props) => {
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
