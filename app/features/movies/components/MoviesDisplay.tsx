"use client";
import React from "react";

import Display from "@/shared/components/Display";

import Link from "next/link";
import {
  getMovies,
  selectMoviesPreview,
  selectStatus,
} from "@/store/movies/moviesSlice";

import { Preview } from "@/shared/interfaces/preview";

const MoviesDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Display<Preview>
        itemsSelector={selectMoviesPreview}
        statusSelector={selectStatus}
        fetchAction={getMovies}
        itemRenderer={(movie) => movie.title}
        title="Games Display"
      />
    </>
  );
};
export default MoviesDisplay;
