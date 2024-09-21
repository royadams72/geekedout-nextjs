"use client";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";
import {
  selectSearchData,
  setSearchData,
} from "@/lib/features/uiData/uiDataSlice";

import { selectComicsPreviews } from "@/lib/features/comics/comicsSlice";
import { selectMusicPreviews } from "@/lib/features/music/musicSlice";
import { selectMoviesPreviews } from "@/lib/features/movies/moviesSlice";
import { selectGamesPreviews } from "@/lib/features/games/gamesSlice";

import { isNotEmpty } from "@/utils/helpers";
import { Preview } from "@/shared/interfaces/preview";

import styles from "@/styles/components/_category.module.scss";

import CategoryItem from "@/shared/components/category/CategoryItem";

const shuffle = (array: Preview[]) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};

const SearchPage = () => {
  const dispatch = useAppDispatch();

  const { searchTerm, items } = useAppSelector(selectSearchData);
  const comics = useAppSelector(selectComicsPreviews);
  const music = useAppSelector(selectMusicPreviews);
  const movies = useAppSelector(selectMoviesPreviews);
  const games = useAppSelector(selectGamesPreviews);

  const [searchVal, setSearchVal] = useState("");
  const [searchItems, setSearchItems] = useState<Preview[]>([]);

  const search = (searchValue: string) => {
    const trimmedValue = searchValue.trim().toLocaleLowerCase();
    const data: Preview[] = [];
    const categories = [...comics, ...music, ...games, ...movies];

    if (trimmedValue.length <= 2) {
      dispatch(setSearchData({ searchTerm: trimmedValue, items: [] }));
    }

    if (trimmedValue !== "" && trimmedValue.length > 2) {
      setTimeout(() => {
        const filteredItems = categories.filter((item) =>
          item.title.toLocaleLowerCase().includes(trimmedValue)
        );

        shuffle(filteredItems);
        dispatch(
          setSearchData({ searchTerm: trimmedValue, items: filteredItems })
        );
        setSearchItems(filteredItems);
      }, 500);
    }
  };

  useEffect(() => {
    if (isNotEmpty(items) || searchTerm) {
      setSearchVal(searchTerm);
      setSearchItems(items);
    }
  }, [items, searchTerm]);

  return (
    <>
      <div className={styles.search__container}>
        {/* search field */}
        <input
          className={styles.search__input}
          onChange={(e) => search(e.target.value)}
          placeholder="Type to get started"
          defaultValue={searchTerm}
        />
      </div>
      {searchItems.length === 0 && searchTerm.length > 3 && (
        <div className={styles.search__container}>
          <p>No results found</p>
        </div>
      )}
      <div className={styles.category__items_container}>
        {/* for loop */}
        {searchItems &&
          searchItems.map((item) => (
            <CategoryItem key={item.id} item={item} isSearch={true} />
          ))}
      </div>
    </>
  );
};

export default SearchPage;
