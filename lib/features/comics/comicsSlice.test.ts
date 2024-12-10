import { configureStore } from "@reduxjs/toolkit";

import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { ComicStore } from "@/types/interfaces/comic";
import { ImageNotFound } from "@/types/enums/image-not-found.enum";

import {
  comicsSlice,
  ComicsSliceState,
  selectComicsPreviews,
  setComics,
} from "@/lib/features/comics/comicsSlice";

let comicsReducer = () => comicSliceMock;

const makeStore = () => {
  return configureStore({
    reducer: comicsReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(comicSliceMock.comics),
  })
) as jest.Mock;

describe("comicSlice", () => {
  let store: any;
  let comicStore: ComicStore;
  let state: ComicsSliceState;

  beforeEach(() => {
    store = makeStore();
    comicStore = comicSliceMock.comics;
    state = store.getState();
  });

  it("should handle setComics action", () => {
    const initialState = {
      comics: { count: 0, limit: 0, offset: 0, results: [] },
    };

    const newState = comicsSlice.reducer(initialState, setComics(comicStore));

    expect(newState.comics).toEqual(comicStore);
  });

  it("should handle selectComicsPreviews", () => {
    const originalArray = rootStateMock.comics.comics.results;

    const previewComics = selectComicsPreviews(rootStateMock);

    expect(previewComics[0].title).toEqual(originalArray[0].title);
  });

  it("should handle selectComicsPreviews when no image", () => {
    const clonedState = {
      ...rootStateMock,
      comics: {
        comics: {
          ...rootStateMock.comics.comics,
          results: [
            {
              ...rootStateMock.comics.comics.results[0],
              images: [],
              thumbnail: {},
            },
          ],
        },
      },
    };

    const previewComics = selectComicsPreviews(clonedState);

    expect(previewComics[0].imageSmall).toEqual(ImageNotFound.SM);
    expect(previewComics[0].imageLarge).toEqual(ImageNotFound.MED_250x250);
  });
});
