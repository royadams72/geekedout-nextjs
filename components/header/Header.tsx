"use client";

import Link from "next/link";
import Image from "next/image";

import { ImagePaths } from "@/types/enums/paths.enums";

import styles from "@/styles/components/_header.module.scss";

const Header = () => {
  const imgWidth = 100;
  const imgHeight = 100;

  return (
    <header className={styles.header}>
      <Link href="/" prefetch={false}>
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
            <Link href="/movies" prefetch={false}>
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
            <Link href="/comics" prefetch={false}>
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
            <Link href="/music" prefetch={false}>
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
            <Link href="/games" prefetch={false}>
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
            <Link href="/search" prefetch={false}>
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
