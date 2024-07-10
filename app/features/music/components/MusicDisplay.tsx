"use client";
import React, { useEffect, useState } from "react";
import {
  getAllAlbums,
  selectAllAlbums,
  selectStatus,
} from "@/app/api/music/store/musicSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Album, AlbumDetail } from "@/shared/interfaces/music";
import { useGetMusicQuery } from "@/app/api/apiMusic";

const MusicDisplay = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAllAlbums) as Album[];
  // const [isClient, setIsClient] = useState(false);
  const isLoaded = useAppSelector(selectStatus) === "idle";
  console.log(albums);

  // // }, []);
  useEffect(() => {
    // if (albums === undefined) {
    dispatch(getAllAlbums());
    console.log("dispatching=============");
    // }

    // setIsClient(true);
  }, []);
  // const { data, isError, isLoading, isSuccess } = useGetMusicQuery([]);
  // console.log(data, isError, isLoading, isSuccess);

  return (
    <>
      <div>MusicDisplay</div>
      {isLoaded && (
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
