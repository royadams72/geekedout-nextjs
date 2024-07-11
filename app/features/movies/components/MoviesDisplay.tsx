"use client";
import React from "react";

import Display from "@/shared/components/Display";

import Link from "next/link";
import {
  getMovies,
  selectMovies,
  selectStatus,
} from "@/store/movies/moviesSlice";
import { Movie } from "@/shared/interfaces/movies";

const MoviesDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Display<Movie>
        itemsSelector={selectMovies}
        statusSelector={selectStatus}
        fetchAction={getMovies}
        itemRenderer={(movie) => movie.title}
        title="Games Display"
      />
    </>
  );
};
export default MoviesDisplay;
