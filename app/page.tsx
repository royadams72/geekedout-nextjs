import { getGamesStore } from "@/lib/features/games/gamesSlice";
import { getComicsStore } from "@/lib/features/comics/comicsSlice";
import { getMoviesStore } from "@/lib/features/movies/moviesSlice";
import { getMusicStore } from "@/lib/features/music/musicSlice";
import { CategoryType } from "@/shared/enums/category-type.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";
import { API_GATEWAY_URL } from "@/lib/redis/redis";

const dataFetchers = [
  { key: CategoryType.Games, fetchFunction: getGamesStore },
  { key: CategoryType.Comics, fetchFunction: getComicsStore },
  { key: CategoryType.Movies, fetchFunction: getMoviesStore },
  { key: CategoryType.Music, fetchFunction: getMusicStore },
];

const Home = async ({
  searchParams: { redirected },
}: {
  searchParams: { redirected: string };
}) => {
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
      {API_GATEWAY_URL}
      <MoviesCategory
        preloadedState={preloadedState.movies}
        isRedirected={redirected}
      />
      <ComicsCategory
        preloadedState={preloadedState.comics}
        isRedirected={redirected}
      />
      <MusicCategory
        preloadedState={preloadedState.music}
        isRedirected={redirected}
      />
      <GamesCategory
        preloadedState={preloadedState.games}
        isRedirected={redirected}
      />
    </>
  );
};
export default Home;
