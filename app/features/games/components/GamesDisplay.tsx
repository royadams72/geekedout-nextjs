"use client";
import React from "react";
import { useAppSelector } from "@/hooks/store.hooks";

import { StateLoading } from "@/shared/enums/loading";

import { useSelectorEffect } from "@/hooks/useSelector";
import {
  getGames,
  selectGames,
  selectStatus,
  selectGamesPreview,
} from "@/store/games/gamesSlice";
import { Game } from "@/shared/interfaces/game";
import Category from "@/shared/components/Category";

import Link from "next/link";
import { Preview } from "@/shared/interfaces/preview";

const GamesDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectGamesPreview}
        statusSelector={selectStatus}
        fetchAction={getGames}
        itemRenderer={(game) => game.title}
        title="Games Category"
      />
    </>
  );
};
export default GamesDisplay;
