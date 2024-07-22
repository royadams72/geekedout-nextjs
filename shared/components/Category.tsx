"use client";
import React, { useEffect, useState } from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/hooks/useSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";

import styles from "@/styles/core/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../interfaces/preview";
import { selectComicsLoaded } from "@/store/comics/comicsSlice";
import { moviesLoaded, selectMoviesLoaded } from "@/store/movies/moviesSlice";

interface DisplayProps<T> {
  itemsSelector: (state: any) => T[];
  statusSelector: (state: any) => string;
  fetchAction: any;
  slot: any;
  itemRenderer: (item: T) => React.ReactNode;
  title: string;
  children: any;
}

const Category = <T extends Preview>({
  itemsSelector,
  statusSelector,
  fetchAction,
  slot,
  itemRenderer,
  title,
  children,
}: DisplayProps<T>) => {
  // const items = useAppSelector(itemsSelector);
  const isClientLoaded = true;
  // const isClientLoaded = useSelectorEffect(items, fetchAction);
  const isLoading = useAppSelector(statusSelector) === StateLoading.LOADING;

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      {isClientLoaded && (
        <div className={styles.category}>
          {slot}
          <h1 className="category__header {{categoryTitleColour}}">{title} </h1>
          <div className={styles.category__itemsContainer}>
            {children}
            {/* {items?.map((item: any) => ( */}

            {/* ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
function comicsLoaded(arg0: boolean): any {
  throw new Error("Function not implemented.");
}
