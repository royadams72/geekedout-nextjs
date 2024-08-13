"use client";
import React from "react";

import Link from "next/link";

import { useAppSelector } from "@/lib/hooks/store.hooks";

import {
  selectStatus,
  selectGamesPreview,
  setGames,
} from "@/lib/features/games/gamesSlice";

import { StateLoading } from "@/shared/enums/loading";
import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";

const GamesCategory = ({ data }: { data: any }) => {
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;

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
        isLoading={isLoading}
      />
    </>
  );
};
export default GamesCategory;
