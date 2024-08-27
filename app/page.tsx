import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import { RootState } from "@/lib/store/store";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";

export default async function Home() {
  const store = await initializeStoreForServer([
    "movies",
    "comics",
    "music",
    "games",
  ]);
  const preloadedState: RootState = store.getState();

  return (
    <>
      <MoviesCategory preloadedState={preloadedState.movies} />
      <ComicsCategory preloadedState={preloadedState.comics} />
      <MusicCategory preloadedState={preloadedState.music} />
      <GamesCategory preloadedState={preloadedState.games} />
    </>
  );
}
