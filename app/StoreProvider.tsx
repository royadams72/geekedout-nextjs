"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import { AppStore, makeStore } from "@/lib/store/store"; // Adjust import as needed

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
