import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/components/_category.module.scss";
import { Preview } from "@/shared/interfaces/preview";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

const CategoryItem = ({
  item,
  isFirstPage,
}: {
  item: Preview;
  isFirstPage: boolean;
}) => {
  const title = item?.title as string;
  const imgMed = item?.imageMedium;
  const imgLrg = item?.imageLarge;
  const itemLink = isFirstPage
    ? `${item.category}`
    : `${item.category}/details/${item.id}`;

  return (
    <>
      <div className={styles.category__item}>
        <Link href={itemLink}>
          <div className={styles[`category__imageContainer`]}>
            <div className={styles.category__image_wrapper}>
              <Image
                src={imgMed || (imgLrg as StaticImport)}
                alt={title}
                fill
                loading="lazy"
                sizes="25vw, 25vh"
              />
            </div>
          </div>
          <p className={styles.category__footer}>
            <span className={styles.category__title}>{title}</span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default CategoryItem;
