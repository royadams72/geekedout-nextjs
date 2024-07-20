import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import type { AppThunk } from "@/store/store";
import { Comic, ComicStore } from "@/shared/interfaces/comic";
import { StateLoading } from "@/shared/enums/loading";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { Paths } from "@/shared/enums/paths.enums";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { Preview } from "@/shared/interfaces/preview";
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
        return response;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          console.log("state.comics=======", state.comics);
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
    selectStatus: (comics) => comics.status,
    // selectComics(comics) => comicPreview(comics),
  },
});

// const selectComicsPreview = (item: any) => {
//   let data;
//   const isImages = item.images !== undefined ? item.images.length > 0 : undefined;

//   const imageNotFound = `${Paths.IMAGES}/image404@2x.png`;
//   const imageNotFound450x210 = `${Paths.IMAGES}/image404-450x210@2x.png`;
//   const imageNotFound250x250 = `${Paths.IMAGES}/image404-250x250@2x.png`;
//   data = {
//     category: CategoryType.Comics, id: item.id, imageLarge: isImages ? `${item.images[0].path}.jpg` : imageNotFound,
//     imageSmall: isImages  ? `${item.images[0].path}/standard_fantastic.jpg` : imageNotFound250x250, title: item.title
//   };
// }

export const getComicsApi = async () => {
  const response = await fetch(
    "http://localhost:3000/api/comics/all-comics?ghghgh"
  );
  const data = await response.json();
  return data;
};

// Action creators are generated for each case reducer function.
export const { getComics } = comicsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectComicsArray, selectStatus } = comicsSlice.selectors;

export const selectComicsPreview = createSelector(
  selectComicsArray,
  (arr: Comic[]) => {
    return arr?.map((comic) => {
      const isImages =
        comic.images !== undefined ? comic.images.length > 0 : undefined;
      return {
        category: CategoryType.Comics,
        id: comic.id,
        title: comic.title,
        imageLarge: isImages
          ? `${comic.images[0].path}.jpg`
          : IMAGE_NOT_FOUND.SM,
        imageSmall: isImages
          ? `${comic.images[0].path}/standard_fantastic.jpg`
          : IMAGE_NOT_FOUND.MED_250x250,
      };
    });
    // return res;
  }
);
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
