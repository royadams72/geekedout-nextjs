import { AppStore, makeStore, RootState } from "./store";
import {
  clearGameDetails,
  getGameDetailsServerSide,
  getGames,
} from "@/lib/features/games/gamesSlice";
import {
  clearAlbumDetails,
  getMusic,
  getMusicDetailsServerSide,
} from "@/lib/features/music/musicSlice";
import {
  clearMovieDetails,
  getMovieDetailServerSide,
  getMovies,
} from "@/lib/features/movies/moviesSlice";
import {
  clearComicDetails,
  getComics,
  setComicDetailsServerSide,
} from "../features/comics/comicsSlice";
import { Persistor, persistStore } from "redux-persist";

let store: AppStore | null = null;
let persistor: Persistor;
const initializePersistedStore = async () => {
  if (store) return store;

  store = makeStore();
  persistor = persistStore(store);

  // Ensure the store is rehydrated with persisted state
  await new Promise((resolve) => {
    persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        resolve(true);
      }
    });
  });
  return store;
};

export const initializeStoreForServer = async (categories: string[] = []) => {
  store = await initializePersistedStore();

  for (const category of categories) {
    switch (category) {
      case "games":
        await store.dispatch(getGames());
        store.dispatch(clearGameDetails());
        break;
      case "music":
        await store.dispatch(getMusic());
        store.dispatch(clearAlbumDetails());
        break;
      case "movies":
        await store.dispatch(getMovies());
        store.dispatch(clearMovieDetails());
        break;
      case "comics":
        await store.dispatch(getComics());
        store.dispatch(clearComicDetails());
        break;
      default:
        break;
    }
  }

  return store;
};

export const initializeStoreForDetailsPage = async (
  categories: string[] = [],
  itemId: string | number
) => {
  if (!store) {
    store = await initializePersistedStore();
  }

  for (const category of categories) {
    switch (category) {
      case "games":
        console.log(category);
        store.dispatch(getGameDetailsServerSide(itemId));
        break;
      case "music":
        console.log(category);
        await store.dispatch(getMusicDetailsServerSide(itemId as string));
        break;
      case "movies":
        console.log(category);
        await store.dispatch(getMovieDetailServerSide(itemId as number));
        break;
      case "comics":
        console.log(category);
        store.dispatch(setComicDetailsServerSide(itemId));
        break;
      default:
        break;
    }
  }
  // console.log("initializeStoreForDetailsPage===", store.getState());
  return store;
};

export const clearStoreForDetailsPage = async (categories: string[] = []) => {
  // console.log("clearStoreForDetailsPage2====", store?.getState());
  if (!store) {
    store = await initializePersistedStore();
  }

  for (const category of categories) {
    switch (category) {
      case "games":
        console.log(category);
        // store.dispatch(getGameDetailsServerSide());
        break;
      case "music":
        console.log(category);
        // await store.dispatch(getMusic());
        break;
      case "movies":
        console.log(category);
        // await store.dispatch(getMovieDetailServerSide(itemId as number));
        break;
      case "comics":
        console.log(category);
        store.dispatch(clearComicDetails());
        break;
      default:
        break;
    }
  }

  return store;
};
