import { getCookie } from "@/lib/actions/getCookie";

import { CategoryType } from "@/types/enums/category-type.enum";
import { ApiPaths } from "@/types/enums/paths.enums";
import { CookieNames } from "@/types/enums/cookie-names.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";
import { getCookieFromResponse } from "@/lib/services/getMusicDetailsFromApi";

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
    url: `${BASE_URL}/${ApiPaths.MUSIC_API}/${GET_DATA_FOLDER}/`,
  },
];

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirected: string }>;
}) => {
  const { redirected } = await searchParams;
  const preloadedState: Record<string, any> = {};
  let cookieData = null;
  let headers = {};
  const token = await getCookie(CookieNames.SPOTIFY_TOKEN);

  const fetchPromises = dataFetchers.map(async ({ key, url }) => {
    const isMusic = key === CategoryType.MUSIC;
    if (key === CategoryType.MUSIC) {
      headers = {
        Cookie: `spotify_token=${token}`,
      };
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          ...(isMusic && token && { Cookie: `spotify_token=${token}` }),
        },
      });

      const textResponse = await response.text(); // Get raw response as text
      console.log(`Raw response for ${key}:`, textResponse); // Log raw response

      const data = JSON.parse(textResponse); // Parse as JSON after logging
      //
      if (isMusic) {
        cookieData = await getCookieFromResponse(response);
        console.log("cookieData in page.tsx:", response, "data:", data);
      }

      return { key, data };
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      return { key, data: {} };
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach(({ key, data }) => {
    preloadedState[key] = { [key]: data };
  });

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
