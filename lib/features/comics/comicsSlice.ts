import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import {
  Comic,
  ComicDetail,
  ComicStore,
  Items,
  Price,
} from "@/shared/interfaces/comic";
import { StateLoading } from "@/shared/enums/loading";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { Paths } from "@/shared/enums/paths.enums";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { Preview } from "@/shared/interfaces/preview";
// import { getToken } from "./counterAPI";

export interface ComicsSliceState {
  comics: ComicStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  selectedComic: ComicDetail;
}

const initialState: ComicsSliceState = {
  comics: {} as ComicStore,
  status: StateLoading.IDLE,
  selectedComic: {} as ComicDetail,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const comicsSlice = createAppSlice({
  name: "comics",
  initialState,
  reducers: (create) => ({
    setComicDetails: create.reducer((state, action: PayloadAction<string>) => {
      state.selectedComic = mapComicDetail(state, action.payload);
    }),
    setComics: create.reducer((state, action: PayloadAction<ComicStore>) => {
      state.comics = action.payload;
    }),
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
          state.status = StateLoading.IDLE;
          state.comics = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
  }),

  selectors: {
    selectComicsArray: (comics) => comics?.comics?.results as Comic[],
    selectStatus: (comics) => comics.status,
    selectComicDetail: (comics) => comics.selectedComic,
  },
});

export const getComicsApi = async () => {
  const response = await fetch("http://localhost:3000/api/comics/all-comics");
  const data = await response.json();
  return data;
};

export const { getComics, setComicDetails, setComics } = comicsSlice.actions;

export const { selectComicsArray, selectStatus, selectComicDetail } =
  comicsSlice.selectors;

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
  }
);

const mapComicDetail = (state: ComicsSliceState, id: string) => {
  const item: Comic | undefined = [...state.comics.results].find(
    (comic: Comic) => {
      return comic.id?.toString() === id;
    }
  );

  const {
    description,
    pageCount,
    prices,
    title: name,
    urls: [{ url: clickThrough }],
    images: [{ path, extension }],
    dates: [{ date: onsaleDate }],
    creators: { items: creators },
  }: any = item;

  const selectedItem: ComicDetail = {
    onsaleDate,
    creators: creators.map((c: Items) => ({ name: c.name, role: c.role })),
    description,
    image: `${path}.${extension}`,
    pageCount,
    printPrice: prices.find((c: Price) => c.type === "printPrice").price,
    clickThrough,
    name,
    category: "Comics",
    id,
  };

  return selectedItem;
};

export const comicsReducer = comicsSlice.reducer;
