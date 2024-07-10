"use client";
import {
  getComics,
  selectComicsArray,
  selectStatus,
} from "@/app/api/comics/store/comicsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Comic, ComicStore } from "@/shared/interfaces/comic";
import React, { useEffect, useState } from "react";

const ComicsDisplay = () => {
  const dispatch = useAppDispatch();
  const comics = useAppSelector(selectComicsArray);

  // const [comics, setComics] = useState<Comic[]>([]);
  const isLoaded = useAppSelector(selectStatus) === "idle";
  useEffect(() => {
    dispatch(getComics());
    // setComics(comicsArray);
  }, []);

  return (
    <>
      <div>ComicsDisplay</div>
      {isLoaded && (
        <ul>
          {comics?.map((comic: Comic) => (
            <li key={comic.id}>{comic.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ComicsDisplay;
