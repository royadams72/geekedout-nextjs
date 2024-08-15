// app/comics/details/ComicDetails.tsx

"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Comic from "@/app/comics/components/Comic";
import {
  selectComicDetail,
  setComicDetails,
} from "@/lib/features/comics/comicsSlice";
import { ComicDetail } from "@/shared/interfaces/comic";

const ComicDetails = ({ preloadedState }: { preloadedState: ComicDetail }) => {
  const dispatch = useAppDispatch();
  const comicDetails: ComicDetail = useAppSelector(selectComicDetail);
  console.log(comicDetails);

  useEffect(() => {
    // if (!comicDetails || comicDetails.id !== id) {
    dispatch(setComicDetails(preloadedState));
    // }
  }, [dispatch, preloadedState]);

  return (
    <ItemDetails<ComicDetail>  itemDetail={preloadedState}>
      <Comic comicDetails={preloadedState} />
    </ItemDetails>
  );
};

export default ComicDetails;
