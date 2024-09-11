"use client";
import {
  selectCurrPrevUrls,
  setFirstPage,
  setUrls,
} from "@/lib/features/uiData/uiDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NavigationActions = () => {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const { currentUrl, previousUrl } = useAppSelector(selectCurrPrevUrls);

  useEffect(() => {
    if (currentUrl !== currentPath) {
      dispatch(setUrls({ currentUrl: currentPath, previousUrl: currentUrl }));
    }
    if (currentPath !== "/") {
      dispatch(setFirstPage(false));
      console.log("dispatch(setFirstPage(false))");
    } else {
      dispatch(setFirstPage(true));
      console.log("dispatch(setFirstPage(true))");
    }
  }, [currentPath, dispatch, currentUrl, previousUrl]);
  // useEffect(() => {
  //   console.log("navigating");
  // }, [currentPath]);

  return null;
};

export default NavigationActions;
