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

  console.log("imgLrg===", imgLrg);
  console.log("imgMed===", imgMed);

  // console.log(item);
  // [ngStyle]="{'margin-top': categoryTitle ==='Movies' && link ? '10px' : (!link ? '10px' : '50px')}" [style.opacity]="isLoaded ? 1 : 0">{{categoryTitle}}
  // [routerLink]="link ? [link] : item.id"
  // [defaultImage]="defaultImage" [lazyLoad]="item.imageSmall" [src]="image" [errorImage]="setErrorImage()" *ngIf="item.imageSmall && smallScreen"
  return (
    <>
      <div className={styles.category__item}>
        <Link href={`${item.category}/details/${item.id}`}>
          <div className={styles[`category__imageContainer`]}>
            <Image
              src={imgMed || (imgLrg as StaticImport)}
              alt={title}
              fill
              loading="lazy"
              objectFit="contain"
              sizes="25vw, 25vh"
            />
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
