"use client";

import Display from "@/shared/components/Display";
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
      <Display<Preview>
        itemsSelector={selectComicsPreview}
        statusSelector={selectStatus}
        fetchAction={getComics}
        itemRenderer={(comic) => `${comic.title}, ${comic.category}`}
        title="Comics Display"
      />
    </>
  );
};

export default ComicsDisplay;
