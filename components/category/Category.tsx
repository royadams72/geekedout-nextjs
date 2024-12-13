"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
  selectIsFirstPage,
  selectSessionId,
  setSessionId,
} from "@/lib/features/uiData/uiDataSlice";

import { isNotEmpty } from "@/lib/utils/validation";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "@/components/category/CategoryItem";
import CategoryLoader from "@/components/category/CategoryLoader";

interface DisplayProps<T> {
  preloadedState: any;
  itemsSelector: (state: any) => T[];
  preloadedStateAction: (stata: any) => any;
  title: string;
  isRedirected?: string;
}

const generateSessionId = (): string => {
  return uuidv4();
};
const sliceNumber = 6;
const Category = <T extends { id: number | string | undefined }>({
  preloadedState,
  itemsSelector,
  preloadedStateAction,
  title,
  isRedirected,
}: DisplayProps<T>) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);
  const storeSessionId = useAppSelector(selectSessionId);
  const isFirstPage = useAppSelector(selectIsFirstPage);

  const [loading, setLoading] = useState(true);
  const [itemsArray, setItemsArray] = useState<Array<T>>([]);

  useEffect(() => {
    if (preloadedState && preloadedState[title.toLowerCase()]) {
      setLoading(false);
    }
  }, [preloadedState, title]);

  useEffect(() => {
    if (loading) return;

    if (!storeSessionId) {
      const sessionId = generateSessionId();
      dispatch(setSessionId(sessionId));
    }
  }, [storeSessionId, dispatch, loading]);

  useEffect(() => {
    if (loading) return;

    if (isNotEmpty(preloadedState[title.toLowerCase()]) && isFirstPage) {
      dispatch(preloadedStateAction(preloadedState[title.toLowerCase()]));
    }
  }, [
    preloadedState,
    preloadedStateAction,
    dispatch,
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
