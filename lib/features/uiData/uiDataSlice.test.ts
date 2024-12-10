import { configureStore } from "@reduxjs/toolkit";

import { uiDataMock } from "@/__mocks__/uiData.mocks";
import {
  comicDetailMock,
  comicsPreviewArray,
} from "@/__mocks__/comics/comics.mocks";

import { UiData } from "@/types/interfaces/uiData";

import {
  clearSearchData,
  clearSelectedItem,
  setFirstPage,
  setSearchData,
  setSelectedItem,
  setSessionId,
  setUrls,
  uiDataSlice,
} from "./uiDataSlice";

let uiDataReducer = () => uiDataMock;

export const initialState: UiData = {
  currPrevUrls: {
    currentUrl: "/",
    previousUrl: "",
  },
  isFirstPage: true,
  searchData: {
    searchTerm: "",
    items: [],
  },
  selectedItem: null,
  sessionId: "",
};

const makeStore = () => {
  return configureStore({
    reducer: uiDataReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

describe("uiDataSlice", () => {
  let store: any;
  let uiDataStore: UiData;
  let state: UiData;

  beforeEach(() => {
    store = makeStore();
    uiDataStore = uiDataMock;
    state = store.getState();
  });

  it("should handle setFirstPage action", () => {
    const newState = uiDataSlice.reducer(initialState, setFirstPage(true));

    expect(newState.isFirstPage).toEqual(true);
  });

  it("should handle setUrls action when moving from home page to movies page", () => {
    const currPrevUrls = { currentUrl: "/movies", previousUrl: "/" };
    const newState = uiDataSlice.reducer(initialState, setUrls(currPrevUrls));

    expect(newState.currPrevUrls).toEqual(currPrevUrls);
  });

  it("should handle setSelectedItem clear selectedItem action", () => {
    const selectedItem = comicDetailMock;
    const newState = uiDataSlice.reducer(
      initialState,
      setSelectedItem(selectedItem)
    );

    expect(newState.selectedItem).toEqual(selectedItem);

    const updatedState = uiDataSlice.reducer(newState, clearSelectedItem());

    expect(updatedState.selectedItem).toEqual(null);
  });

  it("should set the sessionId", () => {
    const sessionId = "0b6b4eee-6802-47b3-9e9e-73bbc759f5e1";
    const newState = uiDataSlice.reducer(initialState, setSessionId(sessionId));

    expect(newState.sessionId).toEqual(sessionId);
  });

  it("should handle setting and clearing the searchData", () => {
    const searchData = {
      searchTerm: "my search term",
      items: comicsPreviewArray,
    };
    const newState = uiDataSlice.reducer(
      initialState,
      setSearchData(searchData)
    );

    expect(newState.searchData).toEqual(searchData);

    const updatedState = uiDataSlice.reducer(newState, clearSearchData());

    expect(updatedState.searchData).toEqual(initialState.searchData);
  });
});
