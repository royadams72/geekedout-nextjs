"use client";
import React from "react";

import Category from "@/shared/components/category/Category";

import Link from "next/link";
import {
  getMovies,
  selectMoviesPreview,
  selectStatus,
} from "@/lib/features/movies/moviesSlice";

import { Preview } from "@/shared/interfaces/preview";

const MoviesCategory = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectMoviesPreview}
        statusSelector={selectStatus}
        fetchAction={getMovies}
        title="Movies"
      />
    </>
  );
};
export default MoviesCategory;
