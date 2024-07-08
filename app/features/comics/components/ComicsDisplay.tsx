"use client";
import {
  loadComics,
  selectComicsArray,
} from "@/app/api/comics/store/comicsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Comic, ComicStore } from "@/shared/interfaces/comic";
import React, { useEffect, useState } from "react";

const ComicsDisplay = () => {
  const dispatch = useAppDispatch();
  const comicsArray = useAppSelector(selectComicsArray);
  const [comics, setComics] = useState<Comic[]>([]);
  useEffect(() => {
    (async () => {
      await fetch(
        // "http://localhost:3000/api/movies/search/woman",
        // "http://localhost:3000/api/movies/all-movies",
        "http://localhost:3000/api/comics/all-comics?fifo",
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((data: any) => {
          console.log("data=====", data);

          dispatch(loadComics(data));
          setComics(comicsArray);
        });
    })();
  }, []);

  return (
    <>
      <div>ComicsDisplay</div>
      <ul>
        {comics.map((comic: Comic) => (
          <li key={comic.id}>{comic.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ComicsDisplay;
