import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";
import {
  ComicsSliceState,
  selectComicsPreviews,
  setComics,
} from "@/lib/features/comics/comicsSlice";
import { selectSessionId } from "@/lib/features/uiData/uiDataSlice";
import Category from "@/shared/components/category/Category";
import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

// Mock the next/router globally
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigation: jest.fn(),
}));

// Mock useAppDispatch globally (used in all tests)
const mockDispatch = jest.fn();
jest.mock("@/lib/hooks/store.hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

// Real Redux reducers
let sessionId = "0b6b4eee-6802-47b3-9e9e-73bbc759f5e1";
let comicsReducer = () => comicSliceMock;
let uiDataReducer = () => ({
  isFirstPage: true,
  sessionId,
});

// Redux store creation function
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

  beforeEach(() => {
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

    // Clear mockDispatch between tests
    jest.clearAllMocks();
  });

  it("renders correct number of items when ON the first page", async () => {
    // No mock for useAppSelector, rely on real Redux store behavior
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
    waitFor(async () => {
      // console.log(comicStore);

      const itemsLength = (await screen.findAllByRole("img")).length;
      expect(itemsLength).toEqual(6);
      // screen.debug();
    });
  });

  fit("renders correct number of items when NOT the first page", async () => {
    // Modify uiDataReducer to simulate NOT being on the first page
    uiDataReducer = () => ({
      isFirstPage: false,
      sessionId,
    });
    store = makeStore(); // Update store with new reducer

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
    waitFor(async () => {
      const itemsLength = (await screen.findAllByRole("img")).length;
      expect(itemsLength).toBeGreaterThanOrEqual(6);
    });
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

    expect(
      screen.getByRole("heading", { name: /Comics/i })
    ).toBeInTheDocument();
  });

  it("displays the loader when loading is true", async () => {
    // Simulate loading state by modifying the reducer
    comicsReducer = () => ({ comics: {} } as ComicsSliceState);
    store = makeStore();

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

    expect(screen.getByText(/Comics loading.../i)).toBeInTheDocument();
  });

  it("dispatches action if no sessionId", () => {
    // Locally mock useAppSelector for this test
    const { useAppSelector } = require("@/lib/hooks/store.hooks");
    useAppSelector.mockImplementation((selector: any) => {
      if (selector === selectSessionId) return ""; // Simulate no sessionId
      return []; // Default behavior for comics
    });

    // Simulate missing sessionId
    uiDataReducer = () => ({
      isFirstPage: true,
      sessionId: "", // Simulate missing sessionId
    });
    store = makeStore();

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

    // Expect dispatch to have been called
    expect(mockDispatch).toHaveBeenCalled();
  });
});
