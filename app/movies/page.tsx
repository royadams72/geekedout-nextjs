import React from "react";

import {
  clearStoreForDetailsPage,
  initializeStoreForServer,
} from "@/lib/store/serverSideStore";

import { RootState } from "@/lib/store/store";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { isEmpty } from "@/utils/helpers";

const MoviesPage = async () => {
  let store = await clearStoreForDetailsPage(["movies"]);
  const preloadedState: RootState = store.getState();
  // console.log(
  //   "isEmpty(preloadedState.movies)===",
  //   isEmpty(preloadedState.movies.movies)
  // );
  // if (isEmpty(preloadedState.movies.movies) || !preloadedState.movies.movies) {
  //   store = await initializeStoreForServer(["movies"]);
  // }

  return (
    <>
      <MoviesCategory
        isFirstPage={false}
        preloadedState={preloadedState.movies}
      />
    </>
  );
};

export default MoviesPage;
