import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import type { AppThunk } from "@/store/store";
import { MusicStore } from "@/shared/interfaces/music";
import { StateLoading } from "@/shared/constants/loading";
// import { fetchToken } from "@/app/api/music/token/route";

export interface MusicSliceState {
  music: MusicStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
}

const initialState: MusicSliceState = {
  music: {} as MusicStore,
  status: StateLoading.IDLE,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const musicSlice = createAppSlice({
  name: "music",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // getToken: create.reducer((state, action: PayloadAction<string>) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.token = action.payload;
    // }),
    getAllAlbums: create.asyncThunk(
      async () => {
        let data = await getMusic();
        return data.data.albums;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.music = action.payload;
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
    selectAllAlbums: (state) => state?.music?.items,
  },
});

// Action creators are generated for each case reducer function.
export const { getAllAlbums } = musicSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectAllAlbums } = musicSlice.selectors;
//
export const musicReducer = musicSlice.reducer;
// Helper functions
// , {
//   next: { revalidate: 10 },
// }
async function getMusic() {
  const response = await fetch("http://localhost:3000/api/music/get-albums/");
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
