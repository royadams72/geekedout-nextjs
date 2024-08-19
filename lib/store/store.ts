import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { comicsReducer } from "@/lib/features/comics/comicsSlice";
import { musicReducer } from "@/lib/features/music/musicSlice";
import { gamesReducer } from "@/lib/features/games/gamesSlice";
import { moviesReducer } from "@/lib/features/movies/moviesSlice";

const persistConfig = {
  key: "root",
  storage: storage,
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
