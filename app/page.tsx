import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import { RootState } from "@/lib/store/store";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";
import { getGamesStore } from "@/lib/features/games/gamesSlice";
import { getComicsStore } from "@/lib/features/comics/comicsSlice";
import { getMoviesStore } from "@/lib/features/movies/moviesSlice";
import { getMusicStore } from "@/lib/features/music/musicSlice";

const dataFetchers = [
  { key: "games", fetchFunction: getGamesStore },
  { key: "comics", fetchFunction: getComicsStore },
  { key: "movies", fetchFunction: getMoviesStore },
  { key: "music", fetchFunction: getMusicStore },
];
export default async function Home() {
  const preloadedState: Record<string, any> = {}; // Use Record<string, any> for better type safety

  for (const { key, fetchFunction } of dataFetchers) {
    try {
      const data = await fetchFunction();
      // console.log("preloadedState games=======", data);
      preloadedState[key] = data;
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      // Set a default value or handle the failure
      preloadedState[key] = null; // or any fallback value
    }
  }
  // Store all getFunctions data on the server
  // await fetch("http://localhost:3000/api/store-category-data", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(preloadedState),
  // });

  return (
    <>
      <MoviesCategory preloadedState={preloadedState.movies} />
      <ComicsCategory preloadedState={preloadedState.comics} />
      <MusicCategory preloadedState={preloadedState.music} />
      <GamesCategory preloadedState={preloadedState.games} />
    </>
  );
}
