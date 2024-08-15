import React from "react";

import GamesDetails from "@/app/games/components/GamesDetails";

const GameDetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  return <GamesDetails id={id} />;
};

export default GameDetailsPage;
