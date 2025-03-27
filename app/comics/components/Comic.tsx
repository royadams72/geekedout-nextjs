import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { formatDate } from "@/lib/utils/date";

import { ComicDetail } from "@/types/interfaces/comic";

const Comic = ({ comicDetails }: { comicDetails: ComicDetail }) => {
  return (
    <>
      {comicDetails?.date_added && (
        <h2>
          <span className={styles.details_alt_colour}>Published: </span>
          {formatDate(comicDetails?.date_added)}
        </h2>
      )}
      <h2>
        {" "}
        <span className={styles.details_alt_colour}>Issue No: </span>
        {comicDetails?.issue_number && comicDetails?.issue_number}
      </h2>
      <h2 className={styles.details_alt_colour}>Description: </h2>
      {comicDetails?.description && (
        <p dangerouslySetInnerHTML={{ __html: comicDetails?.description }} />
      )}

      <Link
        href={comicDetails?.api_detail_url as string}
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
