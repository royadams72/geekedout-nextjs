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
const MUSIC_API = "api/music";
const dataFetchers = [
  // { key: CategoryType.Games, fetchFunction: getGamesStore },
  // { key: CategoryType.Comics, fetchFunction: getComicsStore },
  // { key: CategoryType.Movies, fetchFunction: getMoviesStore },
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
  // const preloadedState: Record<string, any> = {};
  const preloadedState: any = {};
  for (const { key, url } of dataFetchers) {
    try {
      const token = cookieStore.get("spotify_token");
      // console.log("token in page::::", token);
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `spotify_token=${JSON.stringify(token)}`,
        },
      });
      if (key === CategoryType.Music) {
        data = await res.json();
        // console.log("data in page", data);
        preloadedState[key] = { [key]: data };
        // cookieToken = data.cookieToken;
      } else {
        preloadedState[key] = data;
      }
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
      {/* <MoviesCategory
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
      /> */}
    </>
  );
};
export default Home;
