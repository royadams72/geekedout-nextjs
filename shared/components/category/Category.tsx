"use client";
import React, { useEffect, useState } from "react";

import { isNotEmpty } from "@/utils/helpers";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "./CategoryItem";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  detailsSelector: (state: any) => any;
  clearDetails: () => any;
  isFirstLoad?: boolean;
  sliceNumber: number;
}

const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  detailsSelector,
  clearDetails,
  isFirstLoad = true,
  sliceNumber,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);
  const isDetailsInStore = useAppSelector(detailsSelector);

  useEffect(() => {
    (async () => {
      if (isDetailsInStore && isNotEmpty(isDetailsInStore)) {
        dispatch(clearDetails());
      }
    })();
  }, [dispatch, clearDetails, isDetailsInStore, title]);

  useEffect(() => {
    if (isNotEmpty(preloadedState) && preloadedState[title.toLowerCase()]) {
      dispatch(preloadedStateAction(preloadedState[title.toLowerCase()]));
    }
  }, [preloadedStateAction, dispatch, preloadedState, title]);

  useEffect(() => {
    if (isNotEmpty(items) && isFirstLoad) {
      return setItemsArray(items.slice(0, sliceNumber));
    }
    setItemsArray(items);
  }, [items]);

  if (itemsArray) {
    return <div>Loading....</div>;
  }

  return (
    <>
      {
        <div className={styles.category}>
          <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
            {title}
          </h1>
          <div className={styles.category__itemsContainer}>
            {(itemsArray as T[]).map((item: T) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default Category;
