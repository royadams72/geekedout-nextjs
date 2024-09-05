"use client";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import { selectIsFirstPage } from "@/lib/features/uiData/uiDataSlice";

import { isNotEmpty } from "@/utils/helpers";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "./CategoryItem";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  detailsSelector: (state: any) => any;
  clearDetails: () => any;
  sliceNumber: number;
}

const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  detailsSelector,
  clearDetails,
  sliceNumber,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const isFirstPage = useAppSelector(selectIsFirstPage);
  const isDetailsInStore = useAppSelector(detailsSelector);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);

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
    if (isNotEmpty(items) && isFirstPage) {
      return setItemsArray(items.slice(0, sliceNumber));
    }
    setItemsArray(items);
  }, [items, isFirstPage, sliceNumber]);

  return (
    <>
      {
        <div className={styles.category}>
          <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
            {title}
          </h1>
          <div className={styles.category__itemsContainer}>
            {itemsArray &&
              (itemsArray as T[]).map((item: T) => {
                return <CategoryItem key={item.id} item={item} />;
              })}
          </div>
        </div>
      }
    </>
  );
};

export default Category;
