import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks/store.hooks";
import { selectIsFirstPage } from "@/lib/features/uiData/uiDataSlice";
import { Preview } from "@/shared/interfaces/preview";
import styles from "@/styles/components/_category.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const CategoryItem = ({
  item,
  parentIsLoaded,
}: {
  item: Preview;
  parentIsLoaded?: boolean;
}) => {
  const title = item?.title as string;
  const imgLrg = item?.imageLarge as StaticImport;
  const isFirstPage = useAppSelector(selectIsFirstPage);
  const [isPreloadedState, setIsPreloadedState] = useState(false);
  const itemLink = isFirstPage
    ? `${item.category}`
    : `${item.category}/details/${item.id}`;

  return (
    <>
      <div
        className={
          isFirstPage ? styles.category__item_firstPage : styles.category__item
        }
      >
        <Link href={itemLink}>
          <div className={styles.category__imageContainer}>
            <div className={styles.category__image_wrapper}>
              <Image
                src={imgLrg}
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
