"use client";
import React, { useEffect } from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/lib/hooks/useSelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../../interfaces/preview";
import { clearStoreForDetailsPage } from "@/lib/store/serverSideStore";
import { update } from "./update";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  detailsSelector: (state: any) => any;
  clearDetails: () => any;
  statusSelector: (state: any) => string;
  isFirstLoad?: boolean;
}

const Category = <T extends Preview>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  detailsSelector,
  clearDetails,
  statusSelector,
  isFirstLoad = true,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const isDetailsInStore = useAppSelector(detailsSelector);
  const isLoading = useAppSelector(statusSelector) === StateLoading.LOADING;
  // const isClientLoaded = useSelectorEffect(items, fetchAction);

  console.log(items);
  useEffect(() => {
    (async () => {
      if (isDetailsInStore && Object.keys(isDetailsInStore).length !== 0) {
        dispatch(clearDetails());
        // update();
        //I want this to be server side
      }
    })();
  }, [dispatch, clearDetails, isDetailsInStore, title]);

  useEffect(() => {
    if (preloadedState && preloadedState[title.toLowerCase()]) {
      dispatch(preloadedStateAction(preloadedState[title.toLowerCase()]));
    }
  }, [preloadedStateAction, dispatch, preloadedState, title]);

  useEffect(() => {
    if (isFirstLoad) {
      items.slice(0, 4);
    }
  }, [items]);

  if (!items) {
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
            {items?.map((item: T) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default Category;
