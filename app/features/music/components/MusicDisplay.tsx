"use client";
import React, { useEffect, useState } from "react";
import {
  getAllAlbums,
  selectAllAlbums,
  selectMusicPreview,
  selectStatus,
} from "@/store/music/musicSlice";
import Display from "@/shared/components/Display";
import Link from "next/link";
import { Preview } from "@/shared/interfaces/preview";

const MusicDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Display<Preview>
        itemsSelector={selectMusicPreview}
        statusSelector={selectStatus}
        fetchAction={getAllAlbums}
        itemRenderer={(album) => album.title}
        title="Games Display"
      />
    </>
  );
};

export default MusicDisplay;
