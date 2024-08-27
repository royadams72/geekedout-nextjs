import React from "react";

import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { RootState } from "@/lib/store/store";

const MoviesPage = async () => {
  const store = await initializeStoreForServer(["movies"]);
  const preloadedState: RootState = store.getState();

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
