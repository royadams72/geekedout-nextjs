// lib/store/serverSideStore.ts

import { makeStore } from "./store";
import { getGames } from "@/lib/features/games/gamesSlice";
import { getMusic } from "@/lib/features/music/musicSlice";
import { getMovies } from "@/lib/features/movies/moviesSlice";
import { getComics } from "@/lib/features/comics/comicsSlice";

export let store: any;
export let cachedStore: any;

export const initializeStoreForServer = async (categories: string[] = []) => {
  store = makeStore();

  // Dispatch actions based on the categories passed
  for (const category of categories) {
    switch (category) {
      case "games":
        console.log(category);
        await store.dispatch(getGames());
        break;
      case "music":
        console.log(category);
        await store.dispatch(getMusic());
        break;
      case "movies":
        console.log(category);
        await store.dispatch(getMovies());
        break;
      case "comics":
        console.log(category);
        await store.dispatch(getComics());
        break;
      default:
        break;
    }
  }
  cachedStore = store.getState();
  // console.log("cachedStore====", cachedStore);
  return store;
};

export const initializeStoreForDetailsPage = async (
  itemId: string | number,
  dispatchAction?: (id: string | number) => any
) => {
  store = makeStore(cachedStore);

  // const comicDetails: ComicDetail = useAppSelector(selectComicDetail);
  // Dispatch the action to fetch item details
  store.dispatch(dispatchAction?.(itemId));
  cachedStore = store.getState();
  console.log("initializeStoreForDetailsPage====", cachedStore);
  return store;
};
