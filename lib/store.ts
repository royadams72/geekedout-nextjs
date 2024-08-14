import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  comicsReducer,
  selectComicDetail,
  setComicDetails,
} from "@/lib/features/comics/comicsSlice";
import { musicReducer } from "@/lib/features/music/musicSlice";
import { gamesReducer } from "@/lib/features/games/gamesSlice";
import { moviesReducer } from "@/lib/features/movies/moviesSlice";
import { ComicDetail } from "@/shared/interfaces/comic";
import { useAppSelector } from "./hooks/store.hooks";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["comics", "music", "games", "movies"],
};
const rootReducer = combineReducers({
  comics: comicsReducer,
  music: musicReducer,
  games: gamesReducer,
  movies: moviesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: any) => {
  // If preloadedState is undefined, attempt to retrieve the current state from the store
  // if (preloadedState === undefined && store) {
  //   preloadedState = store.getState();
  // }

  return configureStore({
    reducer: persistedReducer,
    preloadedState, // This allows SSR state to be injected
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

// lib/store/serverSideStore.ts

export const initializeStoreForDetailsPage = async (itemId: string) => {
  const store = makeStore();
  // const comicDetails: ComicDetail = useAppSelector(selectComicDetail);
  // Dispatch the action to fetch item details
  store.dispatch(setComicDetails(itemId));

  return store;
};

export const initializeStoreForServer: any = async (
  fetchSomeData?: () => any
) => {
  const store = makeStore();

  // Dispatch any server-side actions here
  if (fetchSomeData) {
    await store.dispatch(fetchSomeData());
  }

  return store;
};
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
