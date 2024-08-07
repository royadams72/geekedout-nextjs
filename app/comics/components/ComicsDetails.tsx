import React from "react";

import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { ComicDetail } from "@/shared/interfaces/comic";

const MusicDetails = ({ comicDetails }: { comicDetails: ComicDetail }) => {
  return (
    <>
      <h1 className={styles.details_title}>{comicDetails?.name}</h1>
      <h4>
        <span className={styles.details_alt_colour}>Published: </span>
        {comicDetails?.onsaleDate}
      </h4>
      {comicDetails?.onsaleDate && (
        <h4>
          <span className={styles.details_alt_colour}>Published: </span>
          {comicDetails?.onsaleDate}
        </h4>
      )}
      <h4>
        {comicDetails?.printPrice && (
          <span>
            <span className={styles.details_alt_colour}>Price: </span>
            &pound;{comicDetails?.printPrice} (Aprox)
          </span>
        )}
        {!comicDetails?.printPrice && (
          <span className={styles.details_alt_colour}>No Price Available</span>
        )}
      </h4>
      <h4>
        <span className={styles.details_alt_colour}>Page Count: </span>
        {comicDetails?.pageCount}
      </h4>
      <ul className={styles.details_ul_comics}>
        {comicDetails?.creators &&
          comicDetails?.creators.map(
            (creator: { name: string; role: string } | undefined, index) => (
              <li key={index}>
                <span className={styles.details_alt_colour}>
                  {creator?.role}:&nbsp;
                </span>
                {creator?.name}
              </li>
            )
          )}
      </ul>
      {comicDetails?.description && <p>{comicDetails?.description}</p>}

      <Link
        href={comicDetails?.clickThrough as string}
        target="_blank"
        className="btn"
      >
        Go to Mavel Website
      </Link>
    </>
  );
};

export default MusicDetails;
