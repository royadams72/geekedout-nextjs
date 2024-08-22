"use client";
import React from "react";

import Category from "@/shared/components/category/Category";

import Link from "next/link";
import {
  clearMovieDetails,
  setMovies,
  selectMovieDetails,
  selectMoviesPreview,
  selectStatus,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import { Preview } from "@/shared/interfaces/preview";
import { StateLoading } from "@/shared/enums/loading";

const MoviesCategory = ({
  preloadedState,
  isFirstLoad,
}: {
  preloadedState: MoviesSliceState;
  isFirstLoad?: boolean;
}) => {
  const status = preloadedState.status;
  console.log(status);

  return (
    <>
      {status === StateLoading.LOADING ? (
        <div>Loading....</div>
      ) : (
        <Category<Preview>
          itemsSelector={selectMoviesPreview}
          title="Movies"
          detailsSelector={selectMovieDetails}
          clearDetails={clearMovieDetails}
          statusSelector={selectStatus}
          preloadedStateAction={setMovies}
          preloadedState={preloadedState}
          isFirstLoad={isFirstLoad}
        />
      )}
    </>
  );
};
export default MoviesCategory;
