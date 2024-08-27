"use client";
import React from "react";

import { Preview } from "@/shared/interfaces/preview";

import {
  clearMovieDetails,
  setMovies,
  selectMovieDetails,
  selectMoviesPreview,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import CategoryContainer from "@/shared/components/category/CategoryContainer";
import Category from "@/shared/components/category/Category";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

const MoviesCategory = ({
  preloadedState,
  isFirstPage,
}: {
  preloadedState: MoviesSliceState;
  isFirstPage?: boolean;
}) => {
  return (
    <CategoryContainer<MoviesSliceState>
      preloadedState={preloadedState}
      title={CategoryTitle.Movies}
    >
      <Category<Preview>
        itemsSelector={selectMoviesPreview}
        title={CategoryTitle.Movies}
        detailsSelector={selectMovieDetails}
        clearDetails={clearMovieDetails}
        preloadedStateAction={setMovies}
        preloadedState={preloadedState}
        isFirstPage={isFirstPage}
        sliceNumber={6}
      />
    </CategoryContainer>
  );
};
export default MoviesCategory;
