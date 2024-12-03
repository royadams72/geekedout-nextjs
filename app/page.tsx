import { cookies } from "next/headers";
import { getGamesStore } from "@/lib/features/games/gamesSlice";
import { getComicsStore } from "@/lib/features/comics/comicsSlice";
import { getMoviesStore } from "@/lib/features/movies/moviesSlice";
import { getMusicStore } from "@/lib/features/music/musicSlice";
import { CategoryType } from "@/shared/enums/category-type.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";

let cookieToken: any;
const cookieStore = await cookies();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_DATA_FOLDER = process.env.NEXT_PUBLIC_GET_DATA_FOLDER;
const MOVIES_API = "api/movies";
const MUSIC_API = "api/music";
const dataFetchers = [
  { key: CategoryType.Games, url: `${BASE_URL}/api/games/${GET_DATA_FOLDER}/` },
  {
    key: CategoryType.Comics,
    url: `${BASE_URL}/api/comics/${GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.Movies,
    url: `${BASE_URL}/${MOVIES_API}/${GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.Music,
    url: `${BASE_URL}/${MUSIC_API}/${GET_DATA_FOLDER}/`,
  },
];

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirected: string }>;
}) => {
  const { redirected } = await searchParams;
  let data: any;
  const preloadedState: Record<string, any> = {};
  // const preloadedState: any = {};
  let headers = {};
  for (const { key, url } of dataFetchers) {
    try {
      const token = cookieStore.get("spotify_token");
      // console.log("token in page::::", token);
      if (key === CategoryType.Music) {
        headers = {
          Cookie: `spotify_token=${JSON.stringify(token)}`,
        };
      }

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers,
      });

      console.log(url);

      data = await res.json();
      preloadedState[key] = { [key]: data };
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      preloadedState[key] = null;
    }
  }

  return (
    <>
      <MusicCategory
        preloadedState={preloadedState.music}
        isRedirected={redirected}
      />
      <MoviesCategory
        preloadedState={preloadedState.movies}
        isRedirected={redirected}
      />
      <ComicsCategory
        preloadedState={preloadedState.comics}
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
