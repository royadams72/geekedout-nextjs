import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { UiData } from "@/shared/interfaces/uiData";

import { AllDetailsTypes } from "@/shared/types/all-categories";
import { Preview } from "@/shared/interfaces/preview";

const initialState: UiData = {
  currPrevUrls: {
    currentUrl: "/",
    previousUrl: "",
  },
  isFirstPage: true,
  searchData: {
    searchTerm: "",
    items: [],
  },
  selectedId: "",
  selectedItem: null,
  sessionId: "",
  sessionIdLoaded: false,
};

export const uiDataSlice = createAppSlice({
  name: "uiData",
  initialState,
  reducers: {
    setFirstPage: (state, action: PayloadAction<boolean>) => {
      state.isFirstPage = action.payload;
    },
    setUrls: (
      state,
      action: PayloadAction<{ currentUrl: string; previousUrl: string }>
    ) => {
      const { currentUrl, previousUrl } = action.payload;
      state.currPrevUrls = { currentUrl, previousUrl };
    },
    setSelectedItem: (state, action: PayloadAction<AllDetailsTypes>) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
      state.sessionIdLoaded = true;
    },
    setSearchData: (
      state,
      action: PayloadAction<{ searchTerm: string; items: Preview[] }>
    ) => {
      const { searchTerm, items } = action.payload;
      state.searchData = { searchTerm, items };
    },
    clearSearchData: (state) => {
      state.searchData = { searchTerm: "", items: [] };
    },
  },
  selectors: {
    selectCurrPrevUrls: (state) => state.currPrevUrls,
    selectIsFirstPage: (state) => state.isFirstPage,
    selectSelectedItem: (state) => state.selectedItem,
    selectSessionId: (state) => state.sessionId,
    selectSessionIdLoaded: (state) => state.sessionIdLoaded,
    selectSearchData: (state) => state.searchData,
  },
});

export const {
  setFirstPage,
  setUrls,
  setSelectedItem,
  clearSelectedItem,
  setSessionId,
  setSearchData,
  clearSearchData,
} = uiDataSlice.actions;

export const {
  selectCurrPrevUrls,
  selectIsFirstPage,
  selectSelectedItem,
  selectSessionId,
  selectSearchData,
  selectSessionIdLoaded,
} = uiDataSlice.selectors;

export const selectSessionInitialized = (state: any) =>
  state.uiData.sessionIdLoaded;
export const uiDataReducer = uiDataSlice.reducer;
