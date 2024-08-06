"use client";
import React, { useEffect, useState } from "react";
import {
  getAllAlbums,
  selectAllAlbums,
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
        fetchAction={getAllAlbums}
        title="Music"
      />
    </>
  );
};

export default MusicCategory;
