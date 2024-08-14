"use client";
import React, { useEffect } from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/lib/hooks/useSelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../../interfaces/preview";

interface DisplayProps<T> {
  data: any;
  itemsSelector: (state: any) => T[];
  dispatchAction: (stata: any) => any;
  title: string;
  detailsSelector: (state: any) => any;
  clearDetails: () => any;
  statusSelector: (state: any) => string;
}

const Category = <T extends Preview>({
  data,
  itemsSelector,
  dispatchAction,
  title,
  detailsSelector,
  clearDetails,
  statusSelector,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const isDetailsInStore = useAppSelector(detailsSelector);
  const isLoading = useAppSelector(statusSelector) === StateLoading.LOADING;
  // const isClientLoaded = useSelectorEffect(items, fetchAction);

  // console.log(items);
  useEffect(() => {
    if (isDetailsInStore && Object.keys(isDetailsInStore).length !== 0) {
      dispatch(clearDetails());
    }
  }, [dispatch, clearDetails, isDetailsInStore]);

  useEffect(() => {
    dispatch(dispatchAction(data));
  }, [dispatchAction, dispatch, data]);

  if (isLoading) {
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
