import Link from "next/link";

import styles from "@/styles/components/_detail.module.scss";

import { MovieDetail } from "@/shared/interfaces/movies";

const Movie = ({ movieDetails }: { movieDetails: MovieDetail }) => {
  return (
    <>
      <h2>
        <span className={styles.details_alt_colour}>Realease Date: </span>
        {movieDetails?.release_date}
      </h2>
      <h2 className={styles.details_alt_colour}>Overview</h2>
      <p className={styles.details_copy}>{movieDetails?.overview}</p>
      {movieDetails?.genres.length > 0 && (
        <section>
          <h2 className={styles.details_alt_colour}>Genres</h2>
          <ul className={styles.details_ul_movies}>
            {movieDetails?.genres.map((genre, index) => (
              <li className={styles.details_ul_movies_li} key={index}>
                {genre}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className={styles.btn_container}>
        {movieDetails?.imdb_link && (
          <Link href={movieDetails?.imdb_link} target="_blank" className="btn">
            View on IMDB
          </Link>
        )}
        {movieDetails?.homepage && (
          <div className="util-helper__margin-top-l">
            <Link href={movieDetails?.homepage} target="_blank" className="btn">
              Spotify Page
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Movie;
