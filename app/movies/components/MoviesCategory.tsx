"use client";
import React from "react";

import Category from "@/shared/components/category/Category";

import Link from "next/link";
import {
  clearMovieDetails,
  setMovies,
  selectMovieDetails,
  selectMoviesPreview,
  selectStatus,
} from "@/lib/features/movies/moviesSlice";

import { Preview } from "@/shared/interfaces/preview";

const MoviesCategory = ({ data }: { data: any }) => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectMoviesPreview}
        data={data}
        dispatchAction={setMovies}
        title="Movies"
        detailsSelector={selectMovieDetails}
        clearDetails={clearMovieDetails}
        statusSelector={selectStatus}
      />
    </>
  );
};
export default MoviesCategory;
