"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import ItemDetails from "@/shared/components/item-details/ItemDetails";

import { ComicDetail } from "@/shared/interfaces/comic";
import ComicsDetails from "@/app/comics/components/ComicsDetails";
import { selectComicDetail } from "@/lib/features/comics/comicsSlice";

const ComicDetails = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  const comicDetails: ComicDetail = useAppSelector(selectComicDetail(id));

  // useEffect(() => {
  //   dispatch(getAlbum(id));
  // }, [dispatch, id]);

  return (
    <ItemDetails<ComicDetail> id={id} itemDetail={comicDetails}>
      <ComicsDetails comicDetails={comicDetails} />
    </ItemDetails>
  );
};

export default ComicDetails;
