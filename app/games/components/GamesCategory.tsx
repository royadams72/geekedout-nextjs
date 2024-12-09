"use client";
import {
  selectGamesPreviews,
  setGames,
  GamesSliceState,
} from "@/lib/features/games/gamesSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

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
