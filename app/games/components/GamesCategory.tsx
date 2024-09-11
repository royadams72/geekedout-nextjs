"use client";
import {
  selectGamesPreview,
  setGames,
  GamesSliceState,
} from "@/lib/features/games/gamesSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";
import CategoryContainer from "@/shared/components/category/CategoryContainer";

const GamesCategory = ({ preloadedState }: { preloadedState: any }) => {
  return (
    <Category<Preview>
      itemsSelector={selectGamesPreview}
      title={CategoryTitle.Games}
      preloadedStateAction={setGames}
      preloadedState={preloadedState}
      sliceNumber={6}
    />
  );
};
export default GamesCategory;
