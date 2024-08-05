"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import styles from "@/styles/components/_detail.module.scss";
import {
  getAlbum,
  selectAlbumDetail,
  selectStatus,
} from "@/lib/features/music/musicSlice";
import { StateLoading } from "@/shared/enums/loading";
import Link from "next/link";
import { AlbumDetail } from "@/shared/interfaces/music";
// import { handleAlbums } from "@/app/api/music/albums/";
const initialAlbumDetail: AlbumDetail = {
  id: "",
  artists: [],
  image: "",
  name: "",
  release_date: "",
  spotify_link: "",
  tracks: [""],
  category: "",
};
const AlbumDetails = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const [albumDetails, setAlbumDetails] =
    useState<AlbumDetail>(initialAlbumDetail);
  const isLoading = useAppSelector(selectStatus) === StateLoading.LOADING;
  const album: AlbumDetail = useAppSelector(selectAlbumDetail);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [category, setCategory] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const fetchAlbumDetails = useCallback(() => {
    setIsFetching(true);
    dispatch(getAlbum(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAlbumDetails(initialAlbumDetail);
    setBackgroundImage("");
    setCategory("");
    fetchAlbumDetails();
  }, [fetchAlbumDetails]);

  useEffect(() => {
    // dispatch(getAlbum(id));
    console.log(album.id, id);

    if (album && album.id === id) {
      setAlbumDetails(album);
      setBackgroundImage(album.image);
      setCategory(album.category);

      setIsFetching(false);
    }
  }, [album, id]);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className={styles[`details_container_${category?.toLowerCase()}`]}>
        <div className={styles.details_btn_container}>
          <Link href={"/music"} className="btn">
            Back to Music
          </Link>
        </div>
        <div className={styles.details_music}>
          <div className={styles.details_info}>
            <h1 className={styles.details_title}>{albumDetails?.name}</h1>
            {albumDetails?.artists.map((artist, index) => (
              <h4 key={index} className={styles.details_sub_heading_music}>
                <Link
                  href={artist?.spotifyUrl}
                  className={styles.details_link}
                  target="_blank"
                >
                  {artist.name}
                </Link>
              </h4>
            ))}
            <h4 className={styles.details_sub_heading_music}>
              Realease Date: {albumDetails?.release_date}
            </h4>
            <h4 className={styles.details_list_heading}>TrackList</h4>
            <div className={styles.details_ol}>
              <ol className={styles.details_ol_music}>
                {albumDetails.tracks.map((track, index) => (
                  <li key={index} className={styles.details_ol_music_li}>
                    <span className={styles.det}>{track}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className={styles.details_image}>
            {albumDetails?.image && (
              <Image
                width={300}
                height={300}
                src={albumDetails?.image}
                alt={albumDetails?.name}
              />
            )}
          </div>
          {albumDetails.spotify_link && (
            <div>
              <a
                href={albumDetails?.spotify_link}
                target="_blank"
                className="btn"
              >
                Spotify Page
              </a>
            </div>
          )}
        </div>
      </div>
      <div style={divStyle} className={styles.backgroundImage}></div>
    </>
  );
};

export default AlbumDetails;
