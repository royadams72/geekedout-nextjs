import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { AlbumDetail } from "@/types/interfaces/music";

const Music = ({ albumDetails }: { albumDetails: AlbumDetail }) => {
  return (
    <>
      <h2 className={styles.details_alt_colour}>Artists:</h2>
      {albumDetails?.artists &&
        albumDetails?.artists.map((artist, index) => (
          <h2 key={index}>
            <Link
              href={artist?.spotifyUrl}
              className={styles.details_link}
              target="_blank"
            >
              {artist.name}
            </Link>
          </h2>
        ))}
      <h2>
        <span className={styles.details_alt_colour}>Realease Date: </span>
        {albumDetails?.release_date}
      </h2>
      <h2>TrackList:</h2>
      <div className={styles.details_ol}>
        <ol className={styles.details_ol_music}>
          {albumDetails.tracks &&
            albumDetails.tracks.map((track, index) => (
              <li key={index} className={styles.details_ol_music_li}>
                <span className={styles.details_ol_music_li_alt_colour}>
                  {track}
                </span>
              </li>
            ))}
        </ol>
      </div>
      {albumDetails.spotify_link && (
        <div>
          <a href={albumDetails?.spotify_link} target="_blank" className="btn">
            Spotify Page
          </a>
        </div>
      )}
    </>
  );
};

export default Music;
