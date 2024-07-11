// "use client";
// import { useGetGamesQuery } from "@/app/api/apiGames";
// import { useGetMoviesQuery } from "@/app/api/apiMovies";
// import { useGetMusicQuery } from "@/app/api/apiMusic";

// import { headers } from "next/headers";
import Link from "next/link";
// import { useAppDispatch } from "@/hooks/hooks";
// import { loadComics } from "./api/comics/store/comicsSlice";
// import { useEffect } from "react";

export default async function Home() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   (async () => {
  //     await fetch(
  //       // "http://localhost:3000/api/movies/search/woman",
  //       // "http://localhost:3000/api/movies/all-movies",
  //       "http://localhost:3000/api/comics/all-comics?fifo",
  //       { method: "GET" }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data=====", data);

  //         dispatch(loadComics(data));
  //       });
  //   })();
  // }, []);

  return (
    <main>
      <ul>
        <li>
          <Link href={"/features/comics"}>Comics</Link>
        </li>
        <li>
          <Link href={"/features/music"}>Music</Link>
        </li>
        <li>
          <Link href={"/features/games"}>Games</Link>
        </li>
        <li>
          <Link href={"/features/movies"}>Movies</Link>
        </li>
      </ul>
    </main>
  );
}
