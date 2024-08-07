"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import ItemDetails from "@/shared/components/item-details/ItemDetails";

import { ComicDetail } from "@/shared/interfaces/comic";
import ComicsDetails from "@/app/comics/components/ComicsDetails";
import {
  selectComicDetail,
  setComicDetails,
} from "@/lib/features/comics/comicsSlice";

const ComicDetails = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const comicDetails: ComicDetail = useAppSelector(selectComicDetail);

  useEffect(() => {
    dispatch(setComicDetails(id));
  }, [dispatch, id]);

  return (
    <ItemDetails<ComicDetail> id={id} itemDetail={comicDetails}>
      <ComicsDetails comicDetails={comicDetails} />
    </ItemDetails>
  );
};

export default ComicDetails;
