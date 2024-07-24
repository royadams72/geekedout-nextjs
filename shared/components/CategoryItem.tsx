import React from "react";
import Image from "next/image";
import styles from "@/styles/core/_category.module.scss";
import { Preview } from "@/shared/interfaces/preview";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

// const Category = <T>({itemsSelector}: DisplayProps<T>) => {}

interface ItemsInterface<T> {
  item: T;
}

const CategoryItem = ({ item }: { item: Preview }) => {
  const title = item?.title as string;
  const imgMed = item?.imageMedium;
  const imgLrg = item?.imageLarge;
  const containerStyle = item.category;

  return (
    <>
      <div className={styles.category__item}>
        <Link href={`${item.category}/details/${item.id}`}>
          <div className={styles[`category__imageContainer`]}>
            <div className={styles.category__image_wrapper}>
              <Image
                className={styles.category__image}
                src={imgMed || (imgLrg as StaticImport)}
                alt={title}
                layout="fill"
                loading="lazy"
                objectFit="cover"
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
