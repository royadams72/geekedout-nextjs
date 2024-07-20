"use client";

import { useAppSelector } from "@/hooks/store.hooks";
import Category from "@/shared/components/Category";
import CategoryItem from "@/shared/components/CategoryItem";
import { Preview } from "@/shared/interfaces/preview";
// import { render } from "./render";
import {
  selectStatus,
  getComics,
  selectComicsPreview,
  getComicsApi,
} from "@/store/comics/comicsSlice";
import Link from "next/link";

const ComicsDisplay = () => {
  const itemsA = useAppSelector(selectComicsPreview);
  // let items: any;
  const render = async (items: any) => {
    // items = await getComicsApi().then((data) => data.results);
    // const items = useAppSelector(selectComicsPreview);
    return await items?.map((item: any) => (
      <li key={item.id}>{`${item.title}`}</li>
    ));
  };

  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <Category<any>
        // slot={<CategoryItem items={items} />}
        itemsRenderer={render(itemsA)}
        items={itemsA}
        statusSelector={selectStatus}
        fetchAction={getComics}
        title="Comics Category"
      />
    </>
  );
};

export default ComicsDisplay;
