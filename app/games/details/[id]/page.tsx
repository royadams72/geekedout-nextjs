"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
  selectGameDetail,
  setGameDetails,
} from "@/lib/features/games/gamesSlice";

import ItemDetails from "@/shared/components/item-details/ItemDetails";

import { GameDetail } from "@/shared/interfaces/game";

import GamesDetails from "@/app/games/components/GamesDetails";

const ComicDetails = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const gameDetail: GameDetail = useAppSelector(selectGameDetail);

  useEffect(() => {
    dispatch(setGameDetails(id));
  }, [dispatch, id]);

  return (
    <ItemDetails<GameDetail> id={id} itemDetail={gameDetail}>
      <GamesDetails gameDetail={gameDetail} />
    </ItemDetails>
  );
};

export default ComicDetails;
