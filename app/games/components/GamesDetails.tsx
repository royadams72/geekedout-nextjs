"use client";
import React, { useEffect } from "react";

import { GameDetail } from "@/shared/interfaces/game";
import { setGameDetails } from "@/lib/features/games/gamesSlice";

import { useAppDispatch } from "@/lib/hooks/store.hooks";
import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Game from "@/app/games/components/Game";

const GamesDetails = ({ preloadedState }: { preloadedState: GameDetail }) => {
  console.log("gameDetail");
  const dispatch = useAppDispatch();
  // const gameDetail: GameDetail = useAppSelector(selectGameDetail);
  // console.log(gameDetail);

  useEffect(() => {
    dispatch(setGameDetails(preloadedState));
  }, [dispatch, preloadedState]);

  return (
    <ItemDetails<GameDetail> itemDetail={preloadedState}>
      <Game gameDetail={preloadedState} />
    </ItemDetails>
  );
};

export default GamesDetails;
