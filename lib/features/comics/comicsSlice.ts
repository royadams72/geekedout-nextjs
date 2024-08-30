import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store/store";
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
    setComicDetails: create.reducer(
      (state, action: PayloadAction<ComicDetail>) => {
        state.selectedComic = action.payload;
      }
    ),
    clearComicDetails: create.reducer((state) => {
      state.selectedComic = {} as ComicDetail;
    }),
    setComics: create.reducer((state, action: PayloadAction<ComicStore>) => {
      state.comics = action.payload;
    }),
  }),

  selectors: {
    selectComicsArray: (comics) => comics?.comics?.results as Comic[],
    selectStatus: (comics) => comics.status,
    selectComicDetail: (comics) => comics.selectedComic,
  },
});

export const { setComicDetails, setComics, clearComicDetails } =
  comicsSlice.actions;

export const { selectComicsArray, selectStatus, selectComicDetail } =
  comicsSlice.selectors;
export const comicsReducer = comicsSlice.reducer;

export const setComicDetailsServerSide = async (
  serverSideStore: ComicsSliceState,
  id: string
): Promise<ComicDetail> => {
  return mapComicDetail(serverSideStore, id);
};

const mapComicDetail = (comics: ComicsSliceState, id: string) => {
  console.log("mapComicDetail===", comics);

  const results = comics?.comics?.results || [];

  const item: Comic | undefined = results.find(
    (comic: Comic) => comic.id?.toString() === id
  );

  if (!item) {
    return {} as ComicDetail; // or handle the case where the comic is not found
  }

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

export const getComicsStore = async (): Promise<ComicsSliceState> => {
  let comicStore;
  let status = StateLoading.IDLE;

  try {
    status = StateLoading.LOADING;

    comicStore = await getComicsApi();

    if (!comicStore) {
      status = StateLoading.FAILED;
      throw new Error("Data was not loaded");
    }

    status = StateLoading.IDLE;
  } catch (error) {
    status = StateLoading.FAILED;
    console.error("Failed to fetch comic details:", error);
    throw error;
  }

  return {
    comics: comicStore,
    status,
    selectedComic: {} as ComicDetail,
  };
};

const getComicsApi = async () => {
  const response = await fetch("http://localhost:3000/api/comics/get-data", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const selectComicsPreviews = createSelector(
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
