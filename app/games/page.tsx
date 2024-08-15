import React from "react";
import GamesCategory from "./components/GamesCategory";
import { getAllGames } from "@/lib/features/games/gamesSlice";

const GamesPage = async () => {
  const data = await getAllGames();

  return <GamesCategory data={data} />;
};

export default GamesPage;
