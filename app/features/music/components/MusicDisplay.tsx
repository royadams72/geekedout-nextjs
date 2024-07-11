"use client";
import React, { useEffect, useState } from "react";
import {
  getAllAlbums,
  selectAllAlbums,
  selectStatus,
} from "@/store/music/musicSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { Album, AlbumDetail } from "@/shared/interfaces/music";
import { useGetMusicQuery } from "@/archive/apiMusic";
import { useSelectorEffect } from "@/hooks/useSelector";
import { StateLoading } from "@/shared/constants/loading";

const MusicDisplay = () => {
  const albums = useAppSelector(selectAllAlbums) as Album[];
  const isLoaded = useAppSelector(selectStatus) === StateLoading.IDLE;
  const isClientLoaded = useSelectorEffect(albums, getAllAlbums);

  if (!isLoaded) {
    <div>Loading....</div>;
  }
  return (
    <>
      <div>MusicDisplay</div>
      {isClientLoaded && (
        <ul>
          {albums?.map((album: Album) => (
            <li key={album.id}>{album.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MusicDisplay;
