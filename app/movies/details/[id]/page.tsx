import React from "react";

import MovieDetails from "../../components/MovieDetails";
import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";
import { RootState } from "@/lib/store/store";

const MovieDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const store = await initializeStoreForDetailsPage(["movies"], id);
  const preloadedState: RootState = store.getState();

  return <MovieDetails preloadedState={preloadedState.movies.selectedMovie} />;
};

export default MovieDetailsPage;
