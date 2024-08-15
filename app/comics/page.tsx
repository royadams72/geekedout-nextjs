import React from "react";

import { initializeStoreForServer } from "@/lib/store/serverSideStore";
import ComicsCategory from "./components/ComicsCategory";

const ComicsPage = async () => {
  // TODO: checks if store has changed
  const store = await initializeStoreForServer(["comics"]);
  const preloadedState = store.getState();
  // console.log("preloadedState===", preloadedState.comics);

  return <ComicsCategory preloadedState={preloadedState.comics} />;
};

export default ComicsPage;
