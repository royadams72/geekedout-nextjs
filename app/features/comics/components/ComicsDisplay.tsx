"use client";

import { useAppSelector } from "@/hooks/store.hooks";
import Display from "@/shared/components/Display";
import { Comic } from "@/shared/interfaces/comic";
import { Preview } from "@/shared/interfaces/preview";
import {
  selectComicsArray,
  selectStatus,
  getComics,
  selectComicsPreview,
} from "@/store/comics/comicsSlice";
import Link from "next/link";

const ComicsDisplay = () => {
  // const items = useAppSelector(selectComicsPreview);
  // console.log(items);

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
