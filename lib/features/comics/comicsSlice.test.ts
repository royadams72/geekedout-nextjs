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
  initialState,
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
    const newState = comicsSlice.reducer(initialState, setComics(comicStore));

    expect(newState.comics).toEqual(comicStore);
  });

  it("should handle selectComicsPreviews", () => {
    const originalArray = rootStateMock.comics.comics.results;

    const previewComics = selectComicsPreviews(rootStateMock);

    expect(previewComics[0].title).toEqual(originalArray[0].name);
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
              image: {
                ...rootStateMock.comics.comics.results[0].image, // Clone the image object too
                small_url: "", // Set small_url to an empty string
              },
            },
          ],
        },
      },
    };

    const previewComics = selectComicsPreviews(clonedState);

    expect(previewComics[0].imageLarge).toEqual(ImageNotFound.MED_250x250);
  });
});
