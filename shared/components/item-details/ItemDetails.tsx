"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

interface ItemProps<T> {
  itemDetail: T | null;
  isLoading?: boolean;
}

interface SelectedItem {
  image: string;
  category: string;
  name: string;
  // Add other properties as needed
}

const initialSelectedItem = {
  image: "",
  category: "",
  name: "",
};

const ItemDetails = <T extends SelectedItem>({
  itemDetail,
  isLoading,
  children,
}: PropsWithChildren<ItemProps<T>>) => {
  const [itemDetails, setItemDetails] =
    useState<SelectedItem>(initialSelectedItem);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [category, setCategory] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (itemDetail) {
      setItemDetails(itemDetail);
      setBackgroundImage(itemDetail.image);
      setCategory(itemDetail.category);
      setIsFetching(false);
    }
  }, [itemDetail]);

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
