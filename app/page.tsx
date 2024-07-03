// import { useGetGamesQuery } from "@/app/api/apiGames";
// import { useGetMoviesQuery } from "@/app/api/apiMovies";
// import { useGetMusicQuery } from "@/app/api/apiMusic";

import { headers } from "next/headers";

export default async function Home() {
  // const {
  //   data: games,
  //   isLoading: isGamesLoading,
  //   error: errorGames,
  // } = useGetGamesQuery({});
  // const {
  //   data: movies,
  //   isLoading: isMoviesLoading,
  //   error: errorMovies,
  // } = useGetMoviesQuery({});
  // // const {
  // //   data: music,
  // //   isLoading: isMusicLoading,
  // //   error: errorMusic,
  // // } = useGetMusicQuery({});
  // console.log(movies, isMoviesLoading, errorMovies);
  // 40081 63441 1003598
  const allGames = await fetch(
    "http://localhost:3000/api/movies/movie-details/63441",
    // "http://localhost:3000/api/movies/all-movies",
    { method: "GET" }
  );
  // .data.results
  const m = await allGames.json();
  console.log("aaaaaaalllllllllGamesllslslslslslslsl=========", m);
  // {`${m.data.results[0].release_date}`}
  return <main>SSSSSSSSSSSS</main>;
}
