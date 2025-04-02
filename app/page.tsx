import { getCookie } from "@/lib/actions/getCookie";

import { ENV } from "@/lib/services/envService";
import { getCookieFromResponse } from "@/lib/services/getMusicDetailsFromApi";

import { CategoryType } from "@/types/enums/category-type.enum";
import { ApiPaths } from "@/types/enums/paths.enums";
import { CookieNames } from "@/types/enums/cookie-names.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";

const dataFetchers = [
  {
    key: CategoryType.GAMES,
    url: `${ENV.BASE_URL}/${ApiPaths.GAMES_API}/${ENV.GET_DATA_FOLDER}/`,
  },
  {
    key: CategoryType.COMICS,
    url: `${ENV.BASE_URL}/${ApiPaths.COMICS_API}/${ENV.GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.MOVIES,
    url: `${ENV.BASE_URL}/${ApiPaths.MOVIES_API}/${ENV.GET_DATA_FOLDER}`,
  },
  {
    key: CategoryType.MUSIC,
    url: `${ENV.BASE_URL}/${ApiPaths.MUSIC_API}/${ENV.GET_DATA_FOLDER}/`,
  },
];

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirected: string }>;
}) => {
  const { redirected } = await searchParams;
  const preloadedState: Record<string, any> = {};
  const token = await getCookie(CookieNames.SPOTIFY_TOKEN);
  let cookieData = null;

  for (const { key, url } of dataFetchers) {
    const isMusic = key === CategoryType.MUSIC;
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          ...(isMusic && { Cookie: `spotify_token=${token}` }),
        },
      });
      const data = await response.json();

      if (isMusic) {
        cookieData = await getCookieFromResponse(response);
      }

      preloadedState[key] = { [key]: data };
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      preloadedState[key] = {};
    }
  }

  return (
    <>
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
        token={cookieData}
      />
      <GamesCategory
        preloadedState={preloadedState.games}
        isRedirected={redirected}
      />
    </>
  );
};
export default Home;
