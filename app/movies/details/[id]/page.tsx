import React from "react";

import MovieDetails from "../../components/MovieDetails";
import { getMovie } from "@/lib/features/movies/moviesSlice";

const MovieDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const movieDetails = await getMovie(id);
  return <MovieDetails id={id} movieDetails={movieDetails} />;
};

export default MovieDetailsPage;
