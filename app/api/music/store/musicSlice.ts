import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import type { AppThunk } from "@/store/store";
import { MusicStore } from "@/shared/interfaces/music";
// import { fetchToken } from "@/app/api/music/token/route";

export interface MusicSliceState {
  music: MusicStore;
  token: string;
  status: "idle" | "loading" | "failed";
}

const initialState: MusicSliceState = {
  music: {} as MusicStore,
  token: "",
  status: "idle",
};
let token: any;
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
    // ,
    // decrement: create.reducer((state) => {
    //   state.value -= 1;
    // }),
    // // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   }
    // ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    getAllAlbums: create.asyncThunk(
      async () => {
        let data = await getMusic();
        console.log(data.data.albums);
        return data.data.albums;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.music = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: (state) => state.status,
    selectAllAlbums: (state) => state.music.items,
  },
});

// Action creators are generated for each case reducer function.
export const { getAllAlbums } = musicSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectAllAlbums } = musicSlice.selectors;
//
export const musicReducer = musicSlice.reducer;
// Helper functions

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
