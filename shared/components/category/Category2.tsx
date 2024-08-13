"use client";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import {
  selectComicsArray,
  setComics,
} from "@/lib/features/comics/comicsSlice";
import Link from "next/link";
import { Preview } from "@/shared/interfaces/preview";

interface DisplayProps<T> {
  data: any;
  itemsSelector: (state: any) => T[];
  statusSelector?: (state: any) => string;
  dispatchAction: any;
  // itemRenderer: (item: T) => React.ReactNode;
  title: string;
}

const Category2 = <T extends Preview>({
  data,
  itemsSelector,
  statusSelector,
  dispatchAction,

  // itemRenderer,
  title,
}: DisplayProps<T>) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(itemsSelector);

  useEffect(() => {
    dispatch(dispatchAction(data));
  }, [dispatchAction, dispatch, data]);
  return (
    <div>
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <Link href={`${item?.category}/details/${item.id}`}>
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Category2;
