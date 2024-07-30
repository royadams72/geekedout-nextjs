"use client";
import React from "react";
import { useAppSelector } from "@/lib/hooks/store.hooks";

import { StateLoading } from "@/shared/enums/loading";

import { useSelectorEffect } from "@/lib/hooks/useSelector";
import {
  getGames,
  selectGames,
  selectStatus,
  selectGamesPreview,
} from "@/lib/features/games/gamesSlice";
import Category from "@/shared/components/category/Category";

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
        title="Games"
      />
    </>
  );
};
export default GamesDisplay;
