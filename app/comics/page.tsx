import React from "react";

import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import ComicsCategory from "./components/ComicsCategory";

const ComicsPage = async () => {
  const store = await initializeStoreForServer(["comics"]);
  const preloadedState = store?.getState();

  return <ComicsCategory preloadedState={preloadedState.comics} />;
};

export default ComicsPage;
