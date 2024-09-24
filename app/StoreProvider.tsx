"use client";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { useRef } from "react";

import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed
interface Props {
  readonly children: ReactNode;
  preloadedState?: any;
}

export const StoreProvider = ({ children, preloadedState }: Props) => {
  const storeRef = useRef<AppStore | null | any>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState?.state);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
