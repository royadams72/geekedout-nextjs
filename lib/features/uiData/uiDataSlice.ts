import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { UiData } from "@/types/interfaces/uiData";

import { AllDetailsTypes } from "@/types/interfaces/all-categories";
import { Preview } from "@/types/interfaces/preview";

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
} = uiDataSlice.selectors;

export const uiDataReducer = uiDataSlice.reducer;
