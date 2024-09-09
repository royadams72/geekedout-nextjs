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
const Home = async () => {
  const preloadedState: Record<string, any> = {};

  for (const { key, fetchFunction } of dataFetchers) {
    try {
      const data = await fetchFunction();

      preloadedState[key] = data;
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      preloadedState[key] = null;
    }
  }

  return (
    <>
      <MoviesCategory preloadedState={preloadedState.movies} />
      <ComicsCategory preloadedState={preloadedState.comics} />
      <MusicCategory preloadedState={preloadedState.music} />
      <GamesCategory preloadedState={preloadedState.games} />
    </>
  );
};
export default Home;
