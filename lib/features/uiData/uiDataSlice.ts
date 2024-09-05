import { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/createAppSlice";
import { UiData } from "@/shared/interfaces/uiData";

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
      console.log({ currentUrl, previousUrl });
    },
  },
  selectors: {
    selectCurrPrevUrls: (state) => state.currPrevUrls,
    selectIsFirstPage: (state) => state.isFirstPage,
  },
});

export const { setFirstPage, setUrls } = uiDataSlice.actions;
export const { selectCurrPrevUrls, selectIsFirstPage } = uiDataSlice.selectors;
export const uiDataReducer = uiDataSlice.reducer;
