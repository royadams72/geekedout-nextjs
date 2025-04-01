import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { formatDate } from "@/lib/utils/date";

import { ComicDetail } from "@/types/interfaces/comic";
import { useEffect, useState } from "react";
import { translate } from "@/lib/utils/translate";

const Comic = ({ comicDetails }: { comicDetails: ComicDetail }) => {
  const [description, setDescription] = useState<TrustedHTML | string>(
    comicDetails?.description as TrustedHTML
  );

  useEffect(() => {
    (async () => {
      const translatedTitle = await translate(description);
      setDescription(translatedTitle);
    })();
  }, [description]);

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
        <p dangerouslySetInnerHTML={{ __html: description }} />
      )}

      <Link
        href={comicDetails?.site_detail_url as string}
        target="_blank"
        rel="noopener noreferrer"
        role="link"
        className="btn"
      >
        Go to comic details
      </Link>
    </>
  );
};

export default Comic;
