import React from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";

import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";

import { ComicStore } from "@/shared/interfaces/comic";
import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";
import {
  ComicsSliceState,
  selectComicsPreviews,
  setComics,
} from "@/lib/features/comics/comicsSlice";

import Category from "@/shared/components/category/Category";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import CategoryLoader from "@/shared/components/category/CategoryLoader";

// Mock the next/router or next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigation: jest.fn(),
}));

let sessionId = "0b6b4eee-6802-47b3-9e9e-73bbc759f5e1";

let comicsReducer = () => comicSliceMock || {};
let uiDataReducer = () => ({
  isFirstPage: true,
  sessionId,
});

const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      comics: comicsReducer,
      uiData: uiDataReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

describe("ComicCategory Component", () => {
  let store: any;
  let comicStore: ComicsSliceState | {};

  beforeEach(async () => {
    store = makeStore();
    comicStore = comicSliceMock;

    const mockUseRouter = jest.requireMock("next/navigation").useRouter;
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
    });

    jest.mock("@/lib/hooks/store.hooks", () => ({
      useAppSelector: jest.fn(),
      useAppDispatch: jest.fn(),
    }));
  });
  afterEach(cleanup);

  it("renders correct number of items when ON the first page", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Category<Preview>
            title={CategoryTitle.Comics}
            itemsSelector={selectComicsPreviews}
            preloadedStateAction={setComics}
            preloadedState={comicStore}
            sliceNumber={6}
          />
        </Provider>
      );
    });
    const itemsLength = (await screen.findAllByRole("img")).length;

    expect(itemsLength).toEqual(6);
  });

  it("renders correct number of items when NOT the first page", async () => {
    uiDataReducer = () => ({
      isFirstPage: false,
      sessionId,
    });
    store = makeStore();
    await act(async () => {
      render(
        <Provider store={store}>
          <Category<Preview>
            title={CategoryTitle.Comics}
            itemsSelector={selectComicsPreviews}
            preloadedStateAction={setComics}
            preloadedState={comicStore}
            sliceNumber={6}
          />
        </Provider>
      );
    });
    const itemsLength = (await screen.findAllByRole("img")).length;

    expect(itemsLength).toBeGreaterThanOrEqual(6);
  });

  it("renders correctly with preloadedState", () => {
    render(
      <Provider store={store}>
        <Category<Preview>
          title={CategoryTitle.Comics}
          itemsSelector={selectComicsPreviews}
          preloadedStateAction={setComics}
          preloadedState={comicStore}
          sliceNumber={6}
        />
      </Provider>
    );
    // });
    expect(
      screen.getByRole("heading", { name: /Comics/i })
    ).toBeInTheDocument();
  });

  it("displays the loader when loading is true", async () => {
    comicsReducer = () => ({ comics: {} } as ComicsSliceState);
    store = makeStore();
    console.log(store.getState());

    await act(async () => {
      render(
        <Provider store={store}>
          <Category<Preview>
            title={CategoryTitle.Comics}
            itemsSelector={selectComicsPreviews}
            preloadedStateAction={setComics}
            preloadedState={undefined}
            sliceNumber={6}
          />
        </Provider>
      );
    });
    await waitFor(() => {
      expect(screen.getByText(/Comics loading.../i)).toBeInTheDocument();
    });
    screen.debug();
  });
});
