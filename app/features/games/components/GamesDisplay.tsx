"use client";
import React from "react";
import { useAppSelector } from "@/hooks/store.hooks";

import { StateLoading } from "@/shared/constants/loading";

import { useSelectorEffect } from "@/hooks/useSelector";
import { getGames, selectGames, selectStatus } from "@/store/games/gamesSlice";
import { Game } from "@/shared/interfaces/game";
import Display from "@/shared/components/Display";

import Link from "next/link";

const GamesDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Display<Game>
        itemsSelector={selectGames}
        statusSelector={selectStatus}
        fetchAction={getGames}
        itemRenderer={(game) => game.title}
        title="Games Display"
      />
    </>
  );
};
export default GamesDisplay;
