"use client";
import { Preview } from "@/types/interfaces/preview";

import {
  setMovies,
  selectMoviesPreviews,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import { CategoryTitle } from "@/types/enums/category-type.enum";

import Category from "@/components/category/Category";

const MoviesCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: MoviesSliceState;
  isRedirected?: string;
}) => {
  return (
    <Category<Preview>
      itemsSelector={selectMoviesPreviews}
      title={CategoryTitle.MOVIES}
      preloadedStateAction={setMovies}
      preloadedState={preloadedState}
      sliceNumber={6}
      isRedirected={isRedirected}
    />
  );
};
export default MoviesCategory;
