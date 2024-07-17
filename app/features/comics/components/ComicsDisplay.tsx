"use client";

import Category from "@/shared/components/Category";
import { Preview } from "@/shared/interfaces/preview";
import {
  selectStatus,
  getComics,
  selectComicsPreview,
} from "@/store/comics/comicsSlice";
import Link from "next/link";

const ComicsDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<Preview>
        itemsSelector={selectComicsPreview}
        statusSelector={selectStatus}
        fetchAction={getComics}
        itemRenderer={(comic) => `${comic.title}, ${comic.category}`}
        title="Comics Category"
      />
    </>
  );
};

export default ComicsDisplay;
