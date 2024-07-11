"use client";
import React from "react";
import { StateLoading } from "@/shared/constants/loading";
import { useSelectorEffect } from "@/hooks/useSelector";
import { useAppSelector } from "@/hooks/store.hooks";

interface DisplayProps<T> {
  itemsSelector: (state: any) => T[];
  statusSelector: (state: any) => string;
  fetchAction: any;
  itemRenderer: (item: T) => React.ReactNode;
  title: string;
}

const Display = <T extends { id?: string | number | undefined }>({
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
      <div>{title}</div>
      {isClientLoaded && (
        <ul>
          {items?.map((item: T) => (
            <li key={item.id}>{itemRenderer(item)}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Display;
