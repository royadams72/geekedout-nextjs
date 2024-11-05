"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
  selectSearchData,
  setSelectedItem,
} from "@/lib/features/uiData/uiDataSlice";

import {
  isAlbumDetail,
  isComicDetail,
  isGameDetail,
  isMappedMovieDetail,
} from "@/shared/types/type-guards";

import styles from "@/styles/components/_detail.module.scss";

import Loader from "@/shared/components/loader/Loader";
import { isEmpty, isNotEmpty } from "@/utils/helpers";

const typeGuards = [
  isMappedMovieDetail,
  isComicDetail,
  isAlbumDetail,
  isGameDetail,
];
interface BasicDetail {
  image: string;
  category: string;
  name: string;
}
interface ItemProps<T> {
  itemDetail: T;
}

const ItemDetails = <T extends BasicDetail>({
  itemDetail,
  children,
}: PropsWithChildren<ItemProps<T>>) => {
  const dispatch = useAppDispatch();

  const { items } = useAppSelector(selectSearchData);

  const [itemDetails, setItemDetails] = useState<T>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [category, setCategory] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (isNotEmpty(itemDetail) && itemDetail.image && itemDetail.category) {
      setItemDetails(itemDetail);
      setBackgroundImage(itemDetail.image);
      setCategory(itemDetail.category);
      setIsFetching(false);

      for (const checkDetailType of typeGuards) {
        if (checkDetailType(itemDetail)) {
          dispatch(setSelectedItem(itemDetail));
          break;
        }
      }
    }
    setIsFetching(false); // Stop loading even if itemDetail is empty
  }, [itemDetail, dispatch]);

  useEffect(() => {
    if (items?.length > 0) {
      setIsSearch(true);
    }
  }, [dispatch, items]);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  if (isFetching) return <Loader />;
  if (isEmpty(itemDetail) && !isFetching)
    return <h1>No details loaded please go back and try again</h1>;
  return (
    <>
      <div className={styles.details_container}>
        <div className={styles[`details_container_${category.toLowerCase()}`]}>
          <div className={styles.details_btn_container}>
            {!isSearch && (
              <Link href={`/${category.toLowerCase()}`} className="btn">
                Back to {category}
              </Link>
            )}
            {isSearch && (
              <Link className="btn" href="/search">
                Back to Search Results
              </Link>
            )}
          </div>
          <article
            aria-labelledby={`${itemDetails?.name}-name`}
            className={styles.details_games}
          >
            <h1
              id={`${itemDetails?.name}-name`}
              className={styles.details_title}
            >
              {itemDetails?.name}
            </h1>

            <div className={styles.details_info}>{children}</div>
            <div className={styles.details_image}>
              {itemDetails?.image && (
                <Image
                  width={300}
                  height={300}
                  src={itemDetails?.image}
                  alt={itemDetails?.name}
                />
              )}
            </div>
          </article>
        </div>
      </div>
      <div style={divStyle} className={styles.backgroundImage}></div>
    </>
  );
};

export default ItemDetails;
