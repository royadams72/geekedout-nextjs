"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
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
  const items = useAppSelector(itemsSelector);
  const storeSessionId = useAppSelector(selectSessionId);
  const isFirstPage = useAppSelector(selectIsFirstPage);

  const [loading, setLoading] = useState(true);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);
  const [categoryState, setCategoryState] = useState<{} | null>(null);
  // console.log("Category rendererd", preloadedState[title.toLowerCase()]);
  useEffect(() => {
    const currentCategoryState = preloadedState[title.toLowerCase()] || null;

    if (currentCategoryState) {
      setCategoryState(currentCategoryState);
      setLoading(false);
      console.log(currentCategoryState);
    }
  }, [preloadedState, title]);

  useEffect(() => {
    if (loading) return;

    if (isNotEmpty(categoryState) && isFirstPage) {
      dispatch(preloadedStateAction(categoryState));
    }
  }, [
    preloadedStateAction,
    dispatch,
    categoryState,
    title,
    isFirstPage,
    loading,
  ]);

  useEffect(() => {
    if (isNotEmpty(items)) {
      setItemsArray(isFirstPage ? items.slice(0, sliceNumber) : items);
    }
  }, [items, isFirstPage, sliceNumber]);

  useEffect(() => {
    if (isRedirected) {
      router.refresh();
    }
  }, [isRedirected, router]);

  useEffect(() => {
    if (loading) return;

    if (!storeSessionId) {
      const sessionId = generateSessionId();
      dispatch(setSessionId(sessionId));
    }
  }, [storeSessionId, dispatch, loading]);

  const content = (
    <>
      {!isFirstPage && (
        <div className={styles.details_btn_container}>
          <Link className="btn" href="/">
            Back to main page
          </Link>
        </div>
      )}
      <div className={styles.category}>
        <h1 className={styles[`category__header_${title.toLowerCase()}`]}>
          {loading ? `${title} loading...` : `${title}`}
        </h1>
        <div className={styles.category__items_container}>
          {itemsArray.length > 0 ? (
            (itemsArray as T[]).map((item: T) => (
              <CategoryItem key={item.id} item={item} />
            ))
          ) : (
            <h1>No items loaded</h1>
          )}
        </div>
      </div>
    </>
  );

  // console.log("preloadedState:", preloadedState.games);
  // if (preloadedState.games.length === 0) return <div>No games loaded</div>;
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {loading ? <CategoryLoader title={title} /> : content}
    </div>
  );
};

export default Category;
