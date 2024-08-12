"use client";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import {
  selectComicsArray,
  setComics,
} from "@/lib/features/comics/comicsSlice";
import Link from "next/link";

const Category2 = ({ data }: { data: any }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectComicsArray);
  console.log(items);
  useEffect(() => {
    dispatch(setComics(data));
  }, [dispatch, data]);
  return (
    <div>
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <Link href={`comics/details/${item.id}`}>{item.title}</Link>
          </div>
        ))}
    </div>
  );
};

export default Category2;
