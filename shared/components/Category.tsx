"use client";
import React from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/hooks/useSelector";
import { useAppSelector } from "@/hooks/store.hooks";

import styles from "@/styles/core/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../interfaces/preview";

interface DisplayProps<T> {
  itemsSelector: (state: any) => T[];
  statusSelector: (state: any) => string;
  fetchAction: any;
  itemRenderer: (item: T) => React.ReactNode;
  title: string;
}

const Category = <T extends Preview>({
  itemsSelector,
  statusSelector,
  fetchAction,
  itemRenderer,
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
          <h1 className="category__header {{categoryTitleColour}}">{title} </h1>
          <div className={styles.category__itemsContainer}>
            {/* {items?.map((item: T) => ( */}
            <CategoryItem>
              {items?.map((item: T) => (
                <div key={item.id} className={styles.category__item}>
                  <a className={styles.category_anchor}>
                    {/* <img
                      className={styles.category_image}
                      src={item.imageSmall}
                      alt="som"
                    /> */}
                    {/* <p className={styles.category__footer}>
                      <span>{item.title}</span>
                    </p> */}
                  </a>
                  <div>{item.title}</div>
                </div>
              ))}
            </CategoryItem>
            {/* // ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
