"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import {
  clearSelectedItem,
  selectIsFirstPage,
  selectSelectedItem,
} from "@/lib/features/uiData/uiDataSlice";
import { isNotEmpty } from "@/utils/helpers";

import styles from "@/styles/components/_category.module.scss";
import CategoryItem from "./CategoryItem";
import Loader from "../loader/Loader";
import CategoryLoader from "./CategoryLoader";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  sliceNumber: number;
}

const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  sliceNumber,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const isFirstPage = useAppSelector(selectIsFirstPage);
  const isDetailsInStore = useAppSelector(selectSelectedItem);

  const [showLoader, setShowLoader] = useState(true);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);
  const [isPreloadedState, setIsPreloadedState] = useState(false);

  useEffect(() => {
    if (isNotEmpty(items)) {
      setItemsArray(isFirstPage ? items.slice(0, sliceNumber) : items);
      setShowLoader(!isPreloadedState);
    }
  }, [items, isFirstPage, sliceNumber, isPreloadedState]);

  useEffect(() => {
    (async () => {
      if (isDetailsInStore && isNotEmpty(isDetailsInStore)) {
        dispatch(clearSelectedItem());
      }
    })();
  }, [dispatch, isDetailsInStore, title]);

  useEffect(() => {
    if (isNotEmpty(preloadedState) && preloadedState[title.toLowerCase()]) {
      dispatch(preloadedStateAction(preloadedState[title.toLowerCase()]));
      setIsPreloadedState(true);
      setShowLoader(false);
    }
  }, [preloadedStateAction, dispatch, preloadedState, title]);

  const content = (
    <div className={styles.category}>
      <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
        {isPreloadedState ? `${title}` : `${title} loading...`}
      </h1>
      <div className={styles.category__itemsContainer}>
        {(itemsArray as T[]).map((item: T) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {showLoader && <CategoryLoader title={title} />}
      {!showLoader && content}
    </div>
  );
};

export default Category;
