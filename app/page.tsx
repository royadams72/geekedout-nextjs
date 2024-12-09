import { getCookie } from "@/lib/actions/getCookie";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { ApiPaths } from "@/shared/enums/paths.enums";
import { CookieNames } from "@/shared/enums/cookie-names.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_DATA_FOLDER = process.env.NEXT_PUBLIC_GET_DATA_FOLDER;
const dataFetchers = [
  {
    key: CategoryType.GAMES,
    url: `${BASE_URL}/${ApiPaths.GAMES_API}/${GET_DATA_FOLDER}/`,
  },
  {
    key: CategoryType.COMICS,
    url: `${BASE_URL}/${ApiPaths.COMICS_API}/${GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.MOVIES,
    url: `${BASE_URL}/${ApiPaths.MOVIES_API}/${GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.MUSIC,
    url: `${BASE_URL}/${ApiPaths.MOVIES_API}/${GET_DATA_FOLDER}/`,
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
  let headers = {};
  for (const { key, url } of dataFetchers) {
    try {
      const token = await getCookie(CookieNames.SPOTIFY_TOKEN);

      if (key === CategoryType.MUSIC) {
        headers = {
          Cookie: `spotify_token=${token}`,
        };
      }

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers,
      });

      data = await res.json();
      preloadedState[key] = { [key]: data };
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      preloadedState[key] = {};
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
