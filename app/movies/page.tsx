import React from "react";
import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { getMoviesApi } from "@/lib/features/movies/moviesSlice";
const MoviesPage = async () => {
  const data = await getMoviesApi();
  console.log(data);

  return (
    <>
      <MoviesCategory data={data} />
    </>
  );
};

export default MoviesPage;
