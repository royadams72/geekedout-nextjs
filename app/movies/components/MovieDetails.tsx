"use client";

import { MappedMovieDetail } from "@/shared/interfaces/movies";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Movie from "@/app/movies/components/Movie";

const MovieDetails = ({
  preloadedState,
}: {
  preloadedState: MappedMovieDetail;
}) => {
  return (
    <ItemDetails<MappedMovieDetail> itemDetail={preloadedState}>
      <Movie movieDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MovieDetails;
