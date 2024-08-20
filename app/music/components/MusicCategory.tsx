"use client";
import React, { useEffect, useState } from "react";
import {
  selectAlbumDetail,
  clearAlbumDetails,
  selectMusicPreview,
  selectStatus,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";
import Category from "@/shared/components/category/Category";
import Link from "next/link";
import { Preview } from "@/shared/interfaces/preview";

const MusicCategory = ({
  preloadedState,
}: {
  preloadedState: MusicSliceState;
}) => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        title="Music"
        itemsSelector={selectMusicPreview}
        statusSelector={selectStatus}
        clearDetails={clearAlbumDetails}
        detailsSelector={selectAlbumDetail}
        preloadedStateAction={setMusic}
        preloadedState={preloadedState}
      />
    </>
  );
};

export default MusicCategory;
