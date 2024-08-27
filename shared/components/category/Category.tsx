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
  isFirstPage?: boolean;
  sliceNumber: number;
}

const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  detailsSelector,
  clearDetails,
  isFirstPage = true,
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
    if (isNotEmpty(items) && isFirstPage) {
      return setItemsArray(items.slice(0, sliceNumber));
    }
    setItemsArray(items);
  }, [items]);

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
                return (
                  <CategoryItem
                    isFirstPage={isFirstPage}
                    key={item.id}
                    item={item}
                  />
                );
              })}
          </div>
        </div>
      }
    </>
  );
};

export default Category;
