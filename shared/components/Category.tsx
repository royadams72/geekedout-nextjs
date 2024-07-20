"use client";
import React from "react";
import { StateLoading } from "@/shared/enums/loading";
import { useSelectorEffect } from "@/hooks/useSelector";
import { useAppSelector } from "@/hooks/store.hooks";

import styles from "@/styles/core/_category.module.scss";

import CategoryItem from "./CategoryItem";
import { Preview } from "../interfaces/preview";

interface DisplayProps<T> {
  statusSelector: (state: any) => string;
  fetchAction: any;
  itemsRenderer: any;
  // slot: any;
  title: string;
  items: any;
  // children: React.ReactNode;
}

const Category = <T extends Preview>({
  statusSelector,
  fetchAction,
  itemsRenderer,
  // slot,
  items,
}: // children,
DisplayProps<T>) => {
  const isClientLoaded = true;
  const isLoading = useAppSelector(statusSelector) === StateLoading.LOADING;
  return (
    <>
      {/* {slot} */}
      {/* {children} */}
      <CategoryItem>{itemsRenderer}</CategoryItem>
      {/* <CategoryItem items={items} itemsRenderer={itemsRenderer}></CategoryItem> */}
    </>
  );
};

export default Category;
