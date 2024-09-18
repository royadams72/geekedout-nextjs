import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { UiData } from "@/shared/interfaces/uiData";

import { AllDetailsTypes } from "@/shared/types/all-categories";

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
  },
  selectors: {
    selectCurrPrevUrls: (state) => state.currPrevUrls,
    selectIsFirstPage: (state) => state.isFirstPage,
    selectSelectedItem: (state) => state.selectedItem,
    selectSessionId: (state) => state.sessionId,
  },
});

export const {
  setFirstPage,
  setUrls,
  setSelectedItem,
  clearSelectedItem,
  setSessionId,
} = uiDataSlice.actions;
export const {
  selectCurrPrevUrls,
  selectIsFirstPage,
  selectSelectedItem,
  selectSessionId,
} = uiDataSlice.selectors;
export const uiDataReducer = uiDataSlice.reducer;
