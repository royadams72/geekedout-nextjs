"use client";
import {
  selectGamesPreviews,
  setGames,
  GamesSliceState,
} from "@/lib/features/games/gamesSlice";

import { Preview } from "@/types/interfaces/preview";
import { CategoryTitle } from "@/types/enums/category-type.enum";

import Category from "@/components/category/Category";

const GamesCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: any;
  isRedirected?: string;
}) => {
  return (
    <Category<Preview>
      itemsSelector={selectGamesPreviews}
      title={CategoryTitle.GAMES}
      preloadedStateAction={setGames}
      preloadedState={preloadedState}
      sliceNumber={6}
    />
  );
};
export default GamesCategory;
