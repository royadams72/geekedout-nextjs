// "use client";
// import { useGetGamesQuery } from "@/app/api/apiGames";
// import { useGetMoviesQuery } from "@/app/api/apiMovies";
// import { useGetMusicQuery } from "@/app/api/apiMusic";

// import { headers } from "next/headers";
import Link from "next/link";
import styles from "@/styles/components/_header.module.scss";
import CategoryItem from "@/shared/components/CategoryItem";
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
      <header className={styles.header}>dhdhdhdhdhddhd</header>
      {/* <CategoryItem>What the actual fuck is going on</CategoryItem> */}
      <ul className="ul">
        <li>
          <Link href={"/comics"}>Comics</Link>
        </li>
        <li>
          <Link href={"/music"}>Music</Link>
        </li>
        <li>
          <Link href={"/games"}>Games</Link>
        </li>
        <li>
          <Link href={"/movies"}>Movies</Link>
        </li>
      </ul>
    </main>
  );
}
