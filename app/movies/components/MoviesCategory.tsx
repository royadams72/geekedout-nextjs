"use client";
import { Preview } from "@/shared/interfaces/preview";

import {
  setMovies,
  selectMoviesPreviews,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

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
