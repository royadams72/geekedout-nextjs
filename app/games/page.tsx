import React from "react";

import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import GamesCategory from "@/app/games/components/GamesCategory";

const GamesPage = async () => {
  const store = await initializeStoreForServer(["games"]);
  const preloadedState = store.getState();

  return (
    <GamesCategory preloadedState={preloadedState.games} isFirstPage={false} />
  );
};

export default GamesPage;
