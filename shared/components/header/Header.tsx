import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/components/_header.module.scss";
import { Paths } from "@/shared/enums/paths.enums";

const Header = () => {
  const imgWidth = 100;
  const imgHeight = 100;
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          className={styles.header__logo_image}
          src={`${Paths.NAV_IMAGES}/logo@2x.png`}
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
                src={`${Paths.NAV_IMAGES}/movies@2x.png`}
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
                src={`${Paths.NAV_IMAGES}/comics@2x.png`}
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
                src={`${Paths.NAV_IMAGES}/music@2x.png`}
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
                src={`${Paths.NAV_IMAGES}/games@2x.png`}
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
                src={`${Paths.NAV_IMAGES}/search@2x.png`}
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
