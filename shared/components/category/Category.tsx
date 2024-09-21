"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
  clearSearchData,
  clearSelectedItem,
  selectIsFirstPage,
  selectSearchData,
  selectSelectedItem,
  selectSessionId,
  setSessionId,
} from "@/lib/features/uiData/uiDataSlice";

import { isNotEmpty } from "@/utils/helpers";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "@/shared/components/category/CategoryItem";
import CategoryLoader from "@/shared/components/category/CategoryLoader";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  sliceNumber: number;
  isRedirected?: string;
}

const generateSessionId = (): string => {
  return uuidv4();
};

const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  sliceNumber,
  isRedirected,
}: DisplayProps<T>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: searchItemsArray } = useAppSelector(selectSearchData);
  const items = useAppSelector(itemsSelector);
  const sessionId = useAppSelector(selectSessionId);
  const isFirstPage = useAppSelector(selectIsFirstPage);
  const isDetailsInStore = useAppSelector(selectSelectedItem);

  const [showLoader, setShowLoader] = useState(true);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);
  const [isPreloadedState, setIsPreloadedState] = useState(false);

  useEffect(() => {
    if (isNotEmpty(preloadedState) && preloadedState[title.toLowerCase()]) {
      dispatch(preloadedStateAction(preloadedState[title.toLowerCase()]));
      setIsPreloadedState(true);
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [preloadedStateAction, dispatch, preloadedState, title]);

  useEffect(() => {
    if (isNotEmpty(items)) {
      setItemsArray(isFirstPage ? items.slice(0, sliceNumber) : items);
    }
  }, [items, isFirstPage, sliceNumber]);

  useEffect(() => {
    if (isDetailsInStore && isNotEmpty(isDetailsInStore)) {
      dispatch(clearSelectedItem());
    }
    if (searchItemsArray?.length > 0) {
      dispatch(clearSearchData());
    }
  }, [dispatch, isDetailsInStore, title, searchItemsArray]);

  useEffect(() => {
    if (!sessionId) {
      dispatch(setSessionId(generateSessionId()));
    }
  });

  useEffect(() => {
    if (isRedirected) {
      router.refresh();
    }
  }, [isRedirected, router]);

  const content = (
    <div className={styles.category}>
      <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
        {isPreloadedState ? `${title}` : `${title} loading...`}
      </h1>
      <div className={styles.category__items_container}>
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
