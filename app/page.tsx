// import { getGamesStore } from "@/lib/features/games/gamesSlice";
// import { getComicsStore } from "@/lib/features/comics/comicsSlice";
// import { getMoviesStore } from "@/lib/features/movies/moviesSlice";
// import { getMusicStore } from "@/lib/features/music/musicSlice";
// import { CategoryType } from "@/shared/enums/category-type.enum";

// import MoviesCategory from "@/app/movies/components/MoviesCategory";
// import ComicsCategory from "@/app/comics/components/ComicsCategory";
// import MusicCategory from "@/app/music/components/MusicCategory";
// import GamesCategory from "./games/components/GamesCategory";

// const dataFetchers = [
//   { key: CategoryType.Games, fetchFunction: getGamesStore },
//   { key: CategoryType.Comics, fetchFunction: getComicsStore },
//   { key: CategoryType.Movies, fetchFunction: getMoviesStore },
//   { key: CategoryType.Music, fetchFunction: getMusicStore },
// ];
// const Home = async ({
//   searchParams: { redirected },
// }: {
//   searchParams: { redirected: string };
// }) => {
//   const preloadedState: Record<string, any> = {};

//   for (const { key, fetchFunction } of dataFetchers) {
//     try {
//       const data = await fetchFunction();
//       preloadedState[key] = data;
//     } catch (error) {
//       console.error(`Error fetching data for ${key}:`, error);
//       preloadedState[key] = null;
//     }
//   }

//   return (
//     <>
//       <MoviesCategory
//         preloadedState={preloadedState.movies}
//         isRedirected={redirected}
//       />
//       <ComicsCategory
//         preloadedState={preloadedState.comics}
//         isRedirected={redirected}
//       />
//       <MusicCategory
//         preloadedState={preloadedState.music}
//         isRedirected={redirected}
//       />
//       <GamesCategory
//         preloadedState={preloadedState.games}
//         isRedirected={redirected}
//       />
//     </>
//   );
// };
// export default Home;

import { CategoryType } from "@/shared/enums/category-type.enum";
import MoviesCategory from "@/app/movies/components/MoviesCategory";
import ComicsCategory from "@/app/comics/components/ComicsCategory";
import MusicCategory from "@/app/music/components/MusicCategory";
import GamesCategory from "./games/components/GamesCategory";
import {
  getSpotifyToken,
  refreshSpotifyToken,
} from "./api/music/token/getToken";
import { cookies } from "next/headers";
const pageNum = "1";
const api_key = process.env.MOVIES_APIKEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL_MOVIES = process.env.BASE_URL_MOVIES;
const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

const dataFetchers = [
  // {
  //   key: CategoryType.Games,
  //   url: `${BASE_URL}/api/games/${GET_DATA_FOLDER}/`,
  // },
  // {
  //   key: CategoryType.Comics,
  //   url: `${BASE_URL}/api/comics/${GET_DATA_FOLDER}/`,
  // },
  {
    key: CategoryType.Movies,
    url: `${BASE_URL_MOVIES}/now_playing?api_key=${api_key}&language=en-GB&pageNum=${pageNum}&region=GB`,
  },
  {
    key: CategoryType.Music,
    url: `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
  },
];
import { headers } from "next/headers";
const Home = async ({
  searchParams: { redirected },
}: {
  searchParams: { redirected: string };
}) => {
  const preloadedState: Record<string, any> = {};
  const cookieStore = cookies();
  let spotifyTokenCookie = cookieStore.get("spotify_token")?.value;
  console.log("spotifyTokenCookie:", spotifyTokenCookie);

  let headers = {};
  for (const { key, url } of dataFetchers) {
    try {
      if (key === CategoryType.Music) {
        if (!spotifyTokenCookie) {
          const response = await fetch(`${BASE_URL}/api/music/token`, {
            method: "POST",
          });
          if (response.ok) {
            spotifyTokenCookie = (await response.json()).token;
          } else {
            console.error("Failed to fetch Spotify token");
          }
        }
        console.log("!spotifyTokenCookie cookieResponse:", spotifyTokenCookie);

        headers = {
          Authorization: `Bearer ${spotifyTokenCookie}`,
        };
      }
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers,
      });

      if (!response.ok) {
        // console.log(await response.json()); //works
        throw new Error(`Failed to fetch ${key}: ${response.status}`);
      }
      const data = await response.json();

      preloadedState[key] = { [key]: { [key]: data } };
      // return response;
      // console.log(preloadedState[key]);
    } catch (error) {
      console.error(`Error fetching data for ${key}:`, error);
      preloadedState[key] = null;
    }
  }

  return (
    <>
      <MoviesCategory
        preloadedState={preloadedState.movies}
        isRedirected={redirected}
      />
      {/* <ComicsCategory
        preloadedState={preloadedState.comics}
        isRedirected={redirected}
      /> */}
      <MusicCategory
        preloadedState={preloadedState.music}
        isRedirected={redirected}
      />
      {/* <GamesCategory
        preloadedState={preloadedState.games}
        isRedirected={redirected}
      /> */}
    </>
  );
};

export default Home;
