"use client";
// import { useGetGamesQuery } from "@/app/api/apiGames";
// import { useGetMoviesQuery } from "@/app/api/apiMovies";
// import { useGetMusicQuery } from "@/app/api/apiMusic";

// import { headers } from "next/headers";
import Link from "next/link";
import styles from "@/styles/components/_header.module.scss";
import CategoryItem from "@/shared/components/CategoryItem";
import { useEffect } from "react";
import { getComics, selectComicsArray } from "@/store/comics/comicsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import {
  getMovies,
  selectMovies,
  selectStatus,
} from "@/store/movies/moviesSlice";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/hooks/useSelector";
// import { loadComics } from "./api/comics/store/comicsSlice";
// import { useEffect } from "react";
let loaded;
function componentDidMount() {}
export default function Home() {
  // let comics;
  // const dispatch = useAppDispatch();
  // dispatch(getMovies());
  const movies = useAppSelector(selectComicsArray);
  const isClientLoaded = useSelectorEffect(movies, getComics);

  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  // //
  // useEffect(() => {
  //   async () => {
  //     await dispatch(getComics());
  //   };
  // }, []);
  // console.log(movies);

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
  //   });
  // }, []);

  return (
    <main>
      <header className={styles.header}>dhdhdhdhdhddhd</header>
      {isClientLoaded && movies?.map((movie) => `${movie.id} ${movie.title}`)}
      {/* <CategoryItem>What the actual fuck is going on</CategoryItem> */}
      <ul className="ul">
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
