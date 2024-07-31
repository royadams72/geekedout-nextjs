"use client";
import React from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/lib/hooks/useSelector";
import { useAppSelector } from "@/lib/hooks/store.hooks";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../../interfaces/preview";

interface DisplayProps<T> {
  itemsSelector: (state: any) => T[];
  statusSelector: (state: any) => string;
  fetchAction: any;
  // itemRenderer: (item: T) => React.ReactNode;
  title: string;
}

const Category = <T extends Preview>({
  itemsSelector,
  statusSelector,
  fetchAction,
  // itemRenderer,
  title,
}: DisplayProps<T>) => {
  const items = useAppSelector(itemsSelector);
  const isClientLoaded = useSelectorEffect(items, fetchAction);
  const isLoading = useAppSelector(statusSelector) === StateLoading.LOADING;

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      {isClientLoaded && (
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
      )}
    </>
  );
};

export default Category;
