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

const GamesCategory = ({ data }: { data: any }) => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectGamesPreview}
        data={data}
        title="Games"
        dispatchAction={setGames}
        detailsSelector={selectGameDetail}
        clearDetails={clearGameDetails}
        statusSelector={selectStatus}
      />
    </>
  );
};
export default GamesCategory;
