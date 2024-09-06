"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { setSelectedItem } from "@/lib/features/uiData/uiDataSlice";

import {
  isAlbumDetail,
  isComicDetail,
  isGameDetail,
  isMovieDetail,
} from "@/shared/types/type-guards";

import { useAppDispatch } from "@/lib/hooks/store.hooks";

const typeGuards = [isMovieDetail, isComicDetail, isAlbumDetail, isGameDetail];
interface BasicDetail {
  image: string;
  category: string;
  name: string;
}
interface ItemProps<T> {
  itemDetail: T;
  isLoading?: boolean;
}

const ItemDetails = <T extends BasicDetail>({
  itemDetail,
  isLoading,
  children,
}: PropsWithChildren<ItemProps<T>>) => {
  const dispatch = useAppDispatch();
  const [itemDetails, setItemDetails] = useState<T>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [category, setCategory] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (itemDetail) {
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
  }, [itemDetail, dispatch]);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.details_container}>
        <div className={styles[`details_container_${category.toLowerCase()}`]}>
          <div className={styles.details_btn_container}>
            <Link href={`/${category.toLowerCase()}`} className="btn">
              Back to {category}
            </Link>
          </div>
          <div className={styles.details_music}>
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
          </div>
        </div>
      </div>
      <div style={divStyle} className={styles.backgroundImage}></div>
    </>
  );
};

export default ItemDetails;
