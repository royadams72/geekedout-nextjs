"use client";

import { GameDetail } from "@/types/interfaces/game";

import ItemDetails from "@/components/item-details/ItemDetails";
import Game from "@/app/games/components/Game";

const GamesDetails = ({ preloadedState }: { preloadedState: GameDetail }) => {
  return (
    <ItemDetails<GameDetail> itemDetail={preloadedState}>
      <Game gameDetail={preloadedState} />
    </ItemDetails>
  );
};

export default GamesDetails;
