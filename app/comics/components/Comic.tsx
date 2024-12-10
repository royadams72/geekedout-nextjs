import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { formatDate } from "@/lib/utils/date";

import { ComicDetail } from "@/types/interfaces/comic";

const Comic = ({ comicDetails }: { comicDetails: ComicDetail }) => {
  return (
    <>
      {comicDetails?.onsaleDate && (
        <h2>
          <span className={styles.details_alt_colour}>Published: </span>
          {formatDate(comicDetails?.onsaleDate)}
        </h2>
      )}
      <h2>
        {comicDetails?.printPrice !== 0 ? (
          <span>
            <span className={styles.details_alt_colour}>Price: </span>
            &pound;{comicDetails.printPrice} (Aprox)
          </span>
        ) : (
          <span className={styles.details_alt_colour}>No Price Available</span>
        )}
      </h2>
      <h2>
        <span className={styles.details_alt_colour}>Page Count: </span>
        {comicDetails?.pageCount}
      </h2>
      <h2>
        <span className={styles.details_alt_colour}>Creators: </span>
      </h2>
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
      <h2 className={styles.details_alt_colour}>Description:</h2>
      {comicDetails?.description && <p>{comicDetails?.description}</p>}

      <Link
        href={comicDetails?.clickThrough as string}
        target="_blank"
        rel="noopener noreferrer"
        role="link"
        className="btn"
      >
        Go to Mavel Website
      </Link>
    </>
  );
};

export default Comic;
