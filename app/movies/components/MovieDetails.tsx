"use client";

import React, { useEffect } from "react";

import { MovieDetail } from "@/shared/interfaces/movies";
import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Movie from "@/app/movies/components/Movie";
import {
  setMovieDetails,
  selectStatus,
} from "@/lib/features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import { StateLoading } from "@/shared/enums/loading";
const MovieDetails = ({
  id,
  movieDetails,
}: {
  id: number;
  movieDetails: MovieDetail;
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;

  useEffect(() => {
    dispatch(setMovieDetails(movieDetails));
  }, [dispatch, movieDetails]);

  return (
    <ItemDetails<MovieDetail>
      id={id}
      itemDetail={movieDetails}
      isLoading={isLoading}
    >
      <Movie movieDetails={movieDetails} />
    </ItemDetails>
  );
};

export default MovieDetails;
