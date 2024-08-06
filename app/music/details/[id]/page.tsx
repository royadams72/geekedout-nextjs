"use client";

import React, { useEffect } from "react";

import {
  getAlbum,
  selectAlbumDetail,
  selectStatus,
} from "@/lib/features/music/musicSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import { StateLoading } from "@/shared/enums/loading";
import { AlbumDetail } from "@/shared/interfaces/music";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import MusicDetails from "@/app/music/components/MusicDetails";

const AlbumDetails = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  const albumDetails: AlbumDetail = useAppSelector(selectAlbumDetail);

  useEffect(() => {
    dispatch(getAlbum(id));
  }, [dispatch, id]);

  return (
    <ItemDetails<AlbumDetail>
      id={id}
      itemDetail={albumDetails}
      isLoading={isLoading}
    >
      <MusicDetails albumDetails={albumDetails} />
    </ItemDetails>
  );
};

export default AlbumDetails;
