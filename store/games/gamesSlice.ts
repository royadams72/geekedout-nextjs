import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";

import { StateLoading } from "@/shared/constants/loading";
import { Game } from "@/shared/interfaces/game";
// import { fetchToken } from "@/app/api/games/token/route";

export interface GamesSliceState {
  games: Game[];
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
}

const initialState: GamesSliceState = {
  games: [] as Game[],
  status: StateLoading.IDLE,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const gamesSlice = createAppSlice({
  name: "games",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getGames: create.asyncThunk(
      async () => {
        let data = await getAllGames();
        return data.data;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.games = action.payload;
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
    selectStatus: (state) => state.status,
    selectGames: (state) => state?.games,
  },
});

// Action creators are generated for each case reducer function.
export const { getGames } = gamesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectGames } = gamesSlice.selectors;
//
export const gamesReducer = gamesSlice.reducer;
// Helper functions
// , {
//   next: { revalidate: 10 },
// }
async function getAllGames() {
  const response = await fetch("http://localhost:3000/api/games/get-games/");
  const data = await response.json();
  return data;
}
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
