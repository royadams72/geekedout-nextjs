import React from "react";

import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";

import GamesDetails from "@/app/games/components/GamesDetails";
import { RootState } from "@/lib/store/store";

const GameDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const store = await initializeStoreForDetailsPage(["games"], id);
  const preloadedState: RootState = store.getState();

  return <GamesDetails preloadedState={preloadedState.games.selectedGame} />;
};

export default GameDetailsPage;
