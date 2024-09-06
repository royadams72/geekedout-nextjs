"use client";

import { MovieDetail } from "@/shared/interfaces/movies";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Movie from "@/app/movies/components/Movie";

const MovieDetails = ({ preloadedState }: { preloadedState: MovieDetail }) => {
  return (
    <ItemDetails<MovieDetail> itemDetail={preloadedState}>
      <Movie movieDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MovieDetails;
