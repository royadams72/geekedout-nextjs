import { Persistor, persistStore } from "redux-persist";

import { AppStore, makeStore, RootState } from "./store";

import {
  clearGameDetails,
  setGameDetailsServerSide,
  getGamesStore,
} from "@/lib/features/games/gamesSlice";
import {
  clearAlbumDetails,
  getMusicDetailsServerSide,
  getMusicStore,
} from "@/lib/features/music/musicSlice";
import {
  clearMovieDetails,
  getMovieDetailServerSide,
  getMoviesStore,
} from "@/lib/features/movies/moviesSlice";
import {
  clearComicDetails,
  getComicsStore,
  setComicDetailsServerSide,
} from "../features/comics/comicsSlice";

let store: AppStore | undefined = undefined;
let preloadedState = {} as RootState;
// console.log();

export const initializeStore = () => {
  // console.log("preloadedState in initializeStore", preloadedState);
  let _store = store ?? makeStore(preloadedState);

  // If we have preloadedState and an existing store, merge them to create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Set the old store to undefined to enforce a fresh creation
    store = undefined;
  }

  // For SSR: always return a new store
  if (typeof window === "undefined") return _store;

  // For the client: create the store once and reuse it
  if (!store) {
    store = _store;
    persistStore(store);
  }

  return _store;
};

export const initializeStoreForServer = async (categories: string[] = []) => {
  // Prepare initial state based on categories
  for (const category of categories) {
    switch (category) {
      case "games":
        preloadedState = { ...preloadedState, games: await getGamesStore() };
        break;
      case "music":
        preloadedState = { ...preloadedState, music: await getMusicStore() };
        break;
      case "movies":
        preloadedState = { ...preloadedState, movies: await getMoviesStore() };
        break;
      case "comics":
        preloadedState = { ...preloadedState, comics: await getComicsStore() };
        break;
      default:
        break;
    }
  }

  const store = initializeStore();
  // console.log("initializeStoreForServer2===", store.getState());
  return store;
};

export const initializeStoreForDetailsPage = async (
  categories: string[] = [],
  itemId: string | number
) => {
  // console.log("preloadedState===== in details", preloadedState);
  // Prepare initial state based on categories and itemId
  for (const category of categories) {
    switch (category) {
      case "games":
        preloadedState = {
          ...preloadedState,
          games: {
            ...preloadedState.games,
            selectedGame: await setGameDetailsServerSide(
              preloadedState.games,
              itemId as string
            ),
          },
        };
        break;
      case "music":
        preloadedState = {
          ...preloadedState,
          music: {
            ...preloadedState.music,
            selectedAlbum: await getMusicDetailsServerSide(itemId as string),
          },
        };
        break;
      case "movies":
        preloadedState = {
          ...preloadedState,
          movies: {
            ...preloadedState.movies,
            selectedMovie: await getMovieDetailServerSide(itemId as number),
          },
        };
        break;
      case "comics":
        preloadedState = {
          ...preloadedState,
          comics: {
            ...preloadedState.comics,
            selectedComic: await setComicDetailsServerSide(
              preloadedState.comics,
              itemId as string
            ),
          },
        };
        break;
      default:
        break;
    }
  }

  const store = initializeStore();
  // console.log("initializeStoreForDetailsPage===", store.getState());
  return store;
};

export const clearStoreForDetailsPage = async (categories: string[] = []) => {
  // console.log("clearStoreForDetailsPage2====", store?.getState());
  // if (!store) {
  store = makeStore();
  // }

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
