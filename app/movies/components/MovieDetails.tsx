"use client";

import { MovieDetail } from "@/types/interfaces/movies";

import ItemDetails from "@/components/item-details/ItemDetails";
import Movie from "@/app/movies/components/Movie";

const MovieDetails = ({ preloadedState }: { preloadedState: MovieDetail }) => {
  return (
    <ItemDetails<MovieDetail> itemDetail={preloadedState}>
      <Movie movieDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MovieDetails;
