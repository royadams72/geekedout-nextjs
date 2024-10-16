import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { act, render, screen, waitFor } from "@testing-library/react";

import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";

import {
  ComicsSliceState,
  selectComicsPreviews,
  setComics,
} from "@/lib/features/comics/comicsSlice";
import { selectIsFirstPage } from "@/lib/features/uiData/uiDataSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useNavigation: jest.fn(),
}));

const refreshMock = jest.fn();

const mockDispatch = jest.fn();
jest.mock("@/lib/hooks/store.hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

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
let mockUseRouter: any;
describe("ComicCategory Component", () => {
  let store: any;
  let comicStore: ComicsSliceState;
  let setItemsArraySpy: jest.SpyInstance;

  beforeEach(() => {
    store = makeStore();
    comicStore = comicSliceMock;

    mockUseRouter = jest.requireMock("next/navigation").useRouter;
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      refresh: refreshMock,
    });

    setItemsArraySpy = jest.spyOn(React, "useState");
    jest.clearAllMocks();
  });

  it("renders correct number of items when ON the first page", async () => {
    let setItemsArrayMock:
      | React.Dispatch<React.SetStateAction<any[]>>
      | undefined;

    setItemsArraySpy.mockImplementationOnce((init) => {
      if (Array.isArray(init)) {
        setItemsArrayMock = jest.fn();
        return [init, setItemsArrayMock];
      }
      return [init, jest.fn()];
    });

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
      expect(setItemsArrayMock).toHaveBeenCalledWith(
        comicStore.comics.results.slice(0, 6)
      );
    });
  });

  it("renders correct number of items when NOT the first page", async () => {
    let setItemsArrayMock:
      | React.Dispatch<React.SetStateAction<any[]>>
      | undefined;

    setItemsArraySpy.mockImplementationOnce((init) => {
      if (Array.isArray(init)) {
        setItemsArrayMock = jest.fn();
        return [init, setItemsArrayMock];
      }
      return [init, jest.fn()];
    });

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
    waitFor(async () => {
      const itemsLength = (await screen.findAllByRole("img")).length;
      expect(setItemsArrayMock).toHaveBeenCalledWith(comicStore.comics.results);
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
    uiDataReducer = () => ({
      isFirstPage: true,
      sessionId: "",
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

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches action to set loaded information in store", () => {
    const { useAppSelector } = require("@/lib/hooks/store.hooks");
    useAppSelector.mockImplementation((selector: any) => {
      if (selector === selectIsFirstPage) return true;
      return [];
    });

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

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "comics/setComics",
      payload: comicStore.comics,
    });
  });

  it("should call router refresh if has been redirected", () => {
    render(
      <Provider store={store}>
        <Category<Preview>
          title={CategoryTitle.Comics}
          itemsSelector={selectComicsPreviews}
          preloadedStateAction={setComics}
          preloadedState={comicStore}
          sliceNumber={6}
          isRedirected={"true"}
        />
      </Provider>
    );

    expect(refreshMock).toHaveBeenCalled();
  });
});
