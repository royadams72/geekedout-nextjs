"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import {
  clearSearchData,
  clearSelectedItem,
  selectCurrPrevUrls,
  selectSearchData,
  selectSelectedItem,
  setFirstPage,
  setUrls,
} from "@/lib/features/uiData/uiDataSlice";

const pages = ["details", "search"];
const notOnPages = (currUrl: string, pages: Array<any>) => {
  return pages.filter((element) => currUrl.includes(element)).length === 0;
};

const NavigationActions = () => {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const { currentUrl, previousUrl } = useAppSelector(selectCurrPrevUrls);

  const searchData = useAppSelector(selectSearchData);
  const selectedItem = useAppSelector(selectSelectedItem);

  useEffect(() => {
    if (notOnPages(currentUrl, pages)) {
      if (searchData.searchTerm) {
        dispatch(clearSearchData());
      }
      if (selectedItem) {
        dispatch(clearSelectedItem());
      }
    }
  }, [currentUrl, selectedItem, searchData.searchTerm, dispatch]);

  useEffect(() => {
    if (currentUrl !== currentPath) {
      dispatch(setUrls({ currentUrl: currentPath, previousUrl: currentUrl }));
    }
    if (currentPath !== "/") {
      dispatch(setFirstPage(false));
    } else {
      dispatch(setFirstPage(true));
    }
  }, [currentPath, dispatch, currentUrl, previousUrl]);

  return null;
};

export default NavigationActions;
