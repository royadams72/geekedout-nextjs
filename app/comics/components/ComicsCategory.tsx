"use client";

import Category from "@/shared/components/category/Category";
import { Preview } from "@/shared/interfaces/preview";
import {
  selectStatus,
  getComics,
  selectComicsPreview,
} from "@/lib/features/comics/comicsSlice";
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
        title="Comics"
      />
    </>
  );
};

export default ComicsDisplay;
