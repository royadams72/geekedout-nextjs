import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import type { AppThunk } from "@/store/store";
import { Comic, ComicStore } from "@/shared/interfaces/comic";
import { StateLoading } from "@/shared/constants/loading";
// import { getToken } from "./counterAPI";

export interface ComicsSliceState {
  comics: ComicStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
}

const initialState: ComicsSliceState = {
  comics: {} as ComicStore,
  status: StateLoading.IDLE,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const comicsSlice = createAppSlice({
  name: "comics",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getComics: create.asyncThunk(
      async () => {
        const response = await getComicsApi();
        // The value we return becomes the `fulfilled` action payload
        return response.data.json();
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.comics = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectComicsArray: (comics) => comics.comics.results as Comic[],
    selectStatus: (counter) => counter.status,
  },
});

const getComicsApi = async () => {
  const response = await fetch("http://localhost:3000/api/comics/all-comics");
  const data = await response.json();
  return data;
};

// Action creators are generated for each case reducer function.
export const { getComics } = comicsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectComicsArray, selectStatus } = comicsSlice.selectors;

export const comicsReducer = comicsSlice.reducer;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
