import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { UiData } from "@/shared/interfaces/uiData";

import { AllDetailsTypes } from "@/shared/types/all-categories";

const initialState: UiData = {
  selectedId: "",
  selectedItem: null,
  isFirstPage: true,
  currPrevUrls: {
    currentUrl: "/",
    previousUrl: "",
  },
  searchData: {
    searchTerm: "",
    items: [],
  },
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
  },
  selectors: {
    selectCurrPrevUrls: (state) => state.currPrevUrls,
    selectIsFirstPage: (state) => state.isFirstPage,
    selectSelectedItem: (state) => state.selectedItem,
  },
});

export const { setFirstPage, setUrls, setSelectedItem, clearSelectedItem } =
  uiDataSlice.actions;
export const { selectCurrPrevUrls, selectIsFirstPage, selectSelectedItem } =
  uiDataSlice.selectors;
export const uiDataReducer = uiDataSlice.reducer;
