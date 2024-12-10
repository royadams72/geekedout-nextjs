"use client";
import { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import { ImagePaths } from "@/types/enums/paths.enums";

import {
  clearSearchData,
  clearSelectedItem,
  selectSearchData,
  selectSelectedItem,
  selectCurrPrevUrls,
} from "@/lib/features/uiData/uiDataSlice";

import styles from "@/styles/components/_header.module.scss";

const notOnPages = (currUrl: string, pages: Array<any>) => {
  return pages.filter((element) => currUrl.includes(element)).length === 0;
};
const pages = ["details", "search"];

const Header = () => {
  const imgWidth = 100;
  const imgHeight = 100;
  const dispatch = useAppDispatch();

  const searchData = useAppSelector(selectSearchData);
  const selectedItem = useAppSelector(selectSelectedItem);
  const currentUrl = useAppSelector(selectCurrPrevUrls).currentUrl;

  useEffect(() => {
    if (notOnPages(currentUrl, pages)) {
      if (searchData.searchTerm) {
        dispatch(clearSearchData());
      }
      if (selectedItem) {
        dispatch(clearSelectedItem());
      }
    }
  }, [currentUrl, selectedItem, searchData.searchTerm, dispatch]);

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.header__logo_image}
          src={`${ImagePaths.NAV_IMAGES}/logo@2x.png`}
          alt="Geeked Out"
          width={300}
          height={100}
        />
      </Link>

      <nav className={styles.header__nav}>
        <ul className={styles.header__nav_ul}>
          <li className={styles.header__nav_item}>
            <Link href="/movies">
              <Image
                className={styles.header__nav_item_img}
                src={`${ImagePaths.NAV_IMAGES}/movies@2x.png`}
                alt="Movies"
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </li>
          <li className={styles.header__nav_item}>
            <Link href="/comics">
              <Image
                className={styles.header__nav_item_img}
                src={`${ImagePaths.NAV_IMAGES}/comics@2x.png`}
                alt="Comics"
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </li>
          <li className={styles.header__nav_item}>
            <Link href="/music">
              <Image
                className={styles.header__nav_item_img}
                src={`${ImagePaths.NAV_IMAGES}/music@2x.png`}
                alt="Music"
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </li>
          <li className="header__nav-item">
            <Link href="/games">
              <Image
                className={styles.header__nav_item_img}
                src={`${ImagePaths.NAV_IMAGES}/games@2x.png`}
                alt="Games"
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </li>
          <li className={styles.header__nav_item}>
            <Link href="/search">
              <Image
                className={styles.header__nav_item_img}
                src={`${ImagePaths.NAV_IMAGES}/search@2x.png`}
                alt="Search"
                width={imgWidth}
                height={imgHeight}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
