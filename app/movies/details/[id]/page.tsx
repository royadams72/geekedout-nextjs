import React from "react";
import MovieDetails from "../../components/MovieDetails";
import { getItemFromCache } from "@/lib/redis";

const MovieDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getItemFromCache("movies", id);
  return <MovieDetails preloadedState={item} />;
};

export default MovieDetailsPage;
