"use client";

import Display from "@/shared/components/Display";
import { Comic } from "@/shared/interfaces/comic";
import {
  selectComicsArray,
  selectStatus,
  getComics,
} from "@/store/comics/comicsSlice";
import Link from "next/link";

const ComicsDisplay = () => {
  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Display<Comic>
        itemsSelector={selectComicsArray}
        statusSelector={selectStatus}
        fetchAction={getComics}
        itemRenderer={(comic) => comic.title}
        title="Comics Display"
      />
    </>
  );
};

export default ComicsDisplay;
