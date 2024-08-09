"use client";

import React, { useEffect } from "react";

import {
  getMovieDetail,
  selectMovieDetails,
  selectStatus,
} from "@/lib/features/movies/moviesSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import { StateLoading } from "@/shared/enums/loading";
import { MovieDetail } from "@/shared/interfaces/movies";

import ItemDetails from "@/shared/components/item-details/ItemDetails";

import MovieDetails from "@/app/movies/components/MovieDetails";

const AlbumDetails = ({ params: { id } }: { params: { id: number } }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  const movieDetails: MovieDetail = useAppSelector(selectMovieDetails);

  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  return (
    <ItemDetails<MovieDetail>
      id={id}
      itemDetail={movieDetails}
      isLoading={isLoading}
    >
      <MovieDetails movieDetails={movieDetails} />
    </ItemDetails>
  );
};

export default AlbumDetails;
