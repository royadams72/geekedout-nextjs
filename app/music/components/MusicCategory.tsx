"use client";
import React, { useEffect, useState } from "react";
import {
  selectAlbumDetail,
  clearAlbumDetails,
  selectMusicPreview,
  selectStatus,
} from "@/lib/features/music/musicSlice";
import Category from "@/shared/components/category/Category";
import Link from "next/link";
import { Preview } from "@/shared/interfaces/preview";

const MusicCategory = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectMusicPreview}
        statusSelector={selectStatus}
        clearDetails={clearAlbumDetails}
        detailsSelector={selectAlbumDetail}
        title="Music"
      />
    </>
  );
};

export default MusicCategory;
