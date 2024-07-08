import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import { comicsReducer, comicsSlice } from "@/app/api/comics/store/comicsSlice";
import { musicReducer, musicSlice } from "@/app/api/music/store/musicSlice";
import { loggerMiddleware } from "./middleware/logger";

import storage from "redux-persist/lib/storage";
// import { counterSlice } from "./features/counter/counterSlice";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
const persistConfig = {
  key: "root",
  storage: storage,
};
// const restOf = ;
// const restOf = combineSlices(
//   comicsSlice,
//   musicSlice
//   // [apiGames.reducerPath]: apiGames.reducer,
//   // [apiMovies.reducerPath]: apiMovies.reducer,
//   // [apiMusic.reducerPath]: apiMusic.reducer,
// );
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({ comics: comicsReducer, music: musicReducer })
);

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(loggerMiddleware);
    // },
  });
  persistStore(store);
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
