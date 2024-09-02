import React from "react";

import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";

import GamesDetails from "@/app/games/components/GamesDetails";
import { RootState } from "@/lib/store/store";
import { getItemFromCache } from "@/lib/redis";

const GameDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getItemFromCache("games", id);

  return <GamesDetails preloadedState={item} />;
};

export default GameDetailsPage;
