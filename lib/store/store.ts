import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { comicsReducer } from "@/lib/features/comics/comicsSlice";
import { musicReducer } from "@/lib/features/music/musicSlice";
import { gamesReducer } from "@/lib/features/games/gamesSlice";
import { moviesReducer } from "@/lib/features/movies/moviesSlice";
import { uiDataReducer } from "@/lib/features/uiData/uiDataSlice";
import { persisterMiddleware } from "@/lib/middleware/persist";

const rootReducer = combineReducers({
  comics: comicsReducer,
  music: musicReducer,
  games: gamesReducer,
  movies: moviesReducer,
  uiData: uiDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const loadState = () => {
  // if (typeof window !== "undefined") {
  const serializedState = localStorage.getItem("redux-store");
  if (serializedState) {
    return JSON.parse(serializedState);
  }
  // }
  return undefined;
};

const preloadedState = loadState();

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(persisterMiddleware.middleware),
  });
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
