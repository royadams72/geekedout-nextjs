import Image from "next/image";
import Link from "next/link";

import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { useAppSelector } from "@/lib/hooks/store.hooks";

import { selectIsFirstPage } from "@/lib/features/uiData/uiDataSlice";

import { Preview } from "@/shared/interfaces/preview";

import styles from "@/styles/components/_category.module.scss";

const CategoryItem = ({
  item,
  isSearch,
}: {
  item: Preview;
  isSearch?: boolean;
}) => {
  const title = item?.title as string;
  const imgLrg = item?.imageLarge as StaticImport;
  const categoryColour = isSearch ? `__${item?.category}` : "";
  const isFirstPage = useAppSelector(selectIsFirstPage);
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
          <div className={styles.category__image_container}>
            <Image
              src={imgLrg}
              alt={title}
              fill
              loading="lazy"
              sizes="(max-width: 600px) 50vw, (max-width: 1200px) 16vw, 16vw"
              className={styles[`category__image${categoryColour}`]}
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
