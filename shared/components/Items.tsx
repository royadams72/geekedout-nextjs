"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  getAllAlbums,
  selectAllAlbums,
} from "@/app/api/music/store/musicSlice";
import { Album, AlbumDetail } from "@/shared/interfaces/music";

const Items = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAllAlbums) as Album[];
  const [isClient, setIsClient] = useState(false);
  // }, []);
  useEffect(() => {
    if (albums === undefined) {
      dispatch(getAllAlbums());
      console.log("albums === undefined", albums);
    }

    setIsClient(true);
  }, [albums, dispatch]);

  return (
    <>
      <div>Items</div>
      {isClient && (
        <ul>
          {albums?.map((album: Album) => (
            <li key={album.id}>{album.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Items;
