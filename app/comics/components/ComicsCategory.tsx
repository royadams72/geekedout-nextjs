"use client";

import {
  selectComicsPreviews,
  setComics,
  selectStatus,
  selectComicDetail,
  clearComicDetails,
} from "@/lib/features/comics/comicsSlice";

import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";

const ComicsDisplay = ({ data }: { data: any }) => {
  return (
    <Category<Preview>
      title="Comics"
      data={data}
      itemsSelector={selectComicsPreviews}
      dispatchAction={setComics}
      detailsSelector={selectComicDetail}
      clearDetails={clearComicDetails}
      statusSelector={selectStatus}
    />
  );
};

export default ComicsDisplay;
