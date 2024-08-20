"use client";
import React from "react";

import Link from "next/link";

import {
  selectStatus,
  selectGamesPreview,
  setGames,
  clearGameDetails,
  selectGameDetail,
} from "@/lib/features/games/gamesSlice";

import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";

const GamesCategory = ({ preloadedState }: { preloadedState: any }) => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectGamesPreview}
        title="Games"
        detailsSelector={selectGameDetail}
        clearDetails={clearGameDetails}
        statusSelector={selectStatus}
        preloadedStateAction={setGames}
        preloadedState={preloadedState}
      />
    </>
  );
};
export default GamesCategory;
