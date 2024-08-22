"use client";
import React, { useEffect, useState } from "react";

import Category from "@/shared/components/category/Category";

import {
  clearMovieDetails,
  setMovies,
  selectMovieDetails,
  selectMoviesPreview,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import { isNotEmpty } from "@/utils/helpers";

import { Preview } from "@/shared/interfaces/preview";
import { StateLoading } from "@/shared/enums/loading";

const MoviesCategory = ({
  preloadedState,
  isFirstLoad,
}: {
  preloadedState: MoviesSliceState;
  isFirstLoad?: boolean;
}) => {
  const [isPreloadedState, setIsPreloadedState] = useState(false);

  useEffect(() => {
    if (isNotEmpty(preloadedState)) {
      console.log("isNotEmpty===", isNotEmpty(preloadedState));

      setIsPreloadedState(true);
    }
  }, [preloadedState]);

  if (!isPreloadedState) return <div>Loading...</div>;
  if (!isPreloadedState && preloadedState.status === StateLoading.FAILED)
    return <div>Category faild to load</div>;
  return (
    <>
      <Category<Preview>
        itemsSelector={selectMoviesPreview}
        title="Movies"
        detailsSelector={selectMovieDetails}
        clearDetails={clearMovieDetails}
        preloadedStateAction={setMovies}
        preloadedState={preloadedState}
        isFirstLoad={isFirstLoad}
        sliceNumber={6}
      />
    </>
  );
};
export default MoviesCategory;
