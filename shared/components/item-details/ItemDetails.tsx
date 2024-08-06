"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

interface ItemProps<T> {
  id: string;
  itemDetail: T | null;
  isLoading: boolean;
}

interface SelectedItem {
  id: string;
  image: string;
  category: string;
  name: string;
  // Add other properties as needed
}

const initialSelectedItem = {
  id: "",
  image: "",
  category: "",
  name: "",
};

const ItemDetails = <T extends SelectedItem>({
  id,
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
    if (itemDetail && itemDetail.id === id) {
      setItemDetails(itemDetail);
      setBackgroundImage(itemDetail.image);
      setCategory(itemDetail.category.toLowerCase());
      setIsFetching(false);
    }
  }, [itemDetail, id]);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className={styles[`details_container_${category}`]}>
        <div className={styles.details_btn_container}>
          <Link href={`/${category}`} className="btn">
            Back to Music
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
      <div style={divStyle} className={styles.backgroundImage}></div>
    </>
  );
};

export default ItemDetails;
