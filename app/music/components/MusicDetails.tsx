"use client";

import React, { useEffect } from "react";

import {
  selectAlbumDetail,
  selectStatus,
  setMusicDetails,
} from "@/lib/features/music/musicSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import { StateLoading } from "@/shared/enums/loading";
import { AlbumDetail } from "@/shared/interfaces/music";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Music from "@/app/music/components/Music";

const MusicDetails = ({ preloadedState }: { preloadedState: AlbumDetail }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  // console.log(preloadedState);

  useEffect(() => {
    dispatch(setMusicDetails(preloadedState));
  }, [dispatch, preloadedState]);

  return (
    <ItemDetails<AlbumDetail> itemDetail={preloadedState} isLoading={isLoading}>
      <Music albumDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MusicDetails;
