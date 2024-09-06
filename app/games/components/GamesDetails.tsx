"use client";

import { GameDetail } from "@/shared/interfaces/game";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Game from "@/app/games/components/Game";

const GamesDetails = ({ preloadedState }: { preloadedState: GameDetail }) => {
  return (
    <ItemDetails<GameDetail> itemDetail={preloadedState}>
      <Game gameDetail={preloadedState} />
    </ItemDetails>
  );
};

export default GamesDetails;
