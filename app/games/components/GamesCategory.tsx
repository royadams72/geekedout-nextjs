"use client";
import React from "react";

import Link from "next/link";

import {
  selectStatus,
  selectGamesPreview,
  setGames,
  clearGameDetails,
  selectGameDetail,
  GamesSliceState,
} from "@/lib/features/games/gamesSlice";

import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";
import { CategoryTitle } from "@/shared/enums/category-type.enum";
import CategoryContainer from "@/shared/components/category/CategoryContainer";

const GamesCategory = ({
  preloadedState,
  isFirstPage,
}: {
  preloadedState: any;
  isFirstPage?: boolean;
}) => {
  return (
    <>
      <CategoryContainer<GamesSliceState>
        preloadedState={preloadedState}
        title={CategoryTitle.Games}
      >
        <Category<Preview>
          itemsSelector={selectGamesPreview}
          title={CategoryTitle.Games}
          detailsSelector={selectGameDetail}
          clearDetails={clearGameDetails}
          preloadedStateAction={setGames}
          preloadedState={preloadedState}
          isFirstPage={isFirstPage}
          sliceNumber={6}
        />
      </CategoryContainer>
    </>
  );
};
export default GamesCategory;
