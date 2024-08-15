"use client";
import React, { useEffect, useState } from "react";

import { GameDetail } from "@/shared/interfaces/game";
import {
  selectGameDetail,
  setGameDetails,
} from "@/lib/features/games/gamesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Game from "./Game";

const GamesDetails = ({ id }: { id: string }) => {
  console.log("gameDetail");
  const dispatch = useAppDispatch();
  const gameDetail: GameDetail = useAppSelector(selectGameDetail);
  console.log(gameDetail);

  useEffect(() => {
    dispatch(setGameDetails(id));
  }, [dispatch, id]);

  return (
    <ItemDetails<GameDetail> id={id} itemDetail={gameDetail}>
      <Game gameDetail={gameDetail} />
    </ItemDetails>
  );
};

export default GamesDetails;
