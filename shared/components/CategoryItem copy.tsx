import React from "react";

import styles from "@/styles/core/_category.module.scss";
import { Preview } from "../interfaces/preview";

const CategoryItem = ({
  items,
}: // children,
{
  items: any;
  // children: React.ReactNode;
}) => {
  // console.log(items);

  // [ngStyle]="{'margin-top': categoryTitle ==='Movies' && link ? '10px' : (!link ? '10px' : '50px')}" [style.opacity]="isLoaded ? 1 : 0">{{categoryTitle}}
  // [routerLink]="link ? [link] : item.id"
  // [defaultImage]="defaultImage" [lazyLoad]="item.imageSmall" [src]="image" [errorImage]="setErrorImage()" *ngIf="item.imageSmall && smallScreen"
  return (
    <>
      {`${items}`}
      {/* {items?.map((item: any) => item.title)} */}
      {/* {items} */}
      {/* <div className={styles.category__item}>
        <a className={styles.category_anchor}>
          <img
            className={styles.category_image}
            src={item.imageSmall}
            alt="som"
          />
          <p className={styles.category__footer}>
            <span>{item.title}</span>
          </p>
        </a>
      </div> */}
    </>
  );
};

export default CategoryItem;
