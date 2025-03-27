"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/store.hooks";

import {
  selectSearchData,
  setSearchData,
} from "@/lib/features/uiData/uiDataSlice";

import { selectComicsPreviews } from "@/lib/features/comics/comicsSlice";
import { selectMusicPreviews } from "@/lib/features/music/musicSlice";
import { selectMoviesPreviews } from "@/lib/features/movies/moviesSlice";
import { selectGamesPreviews } from "@/lib/features/games/gamesSlice";

import { Preview } from "@/types/interfaces/preview";

import styles from "@/styles/components/_category.module.scss";
import CategoryItem from "@/components/category/CategoryItem";

const shuffle = (array: Preview[]) => {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};

const Search = () => {
  const dispatch = useAppDispatch();

  const { searchTerm, items: serachedItems } = useAppSelector(selectSearchData);

  const comics = useAppSelector(selectComicsPreviews);
  const music = useAppSelector(selectMusicPreviews);
  const movies = useAppSelector(selectMoviesPreviews);
  const games = useAppSelector(selectGamesPreviews);

  const search = (searchValue: string) => {
    const trimmedValue = searchValue.trim().toLocaleLowerCase();
    const categories = [...comics, ...music, ...games, ...movies];

    if (trimmedValue.length <= 2) {
      dispatch(setSearchData({ searchTerm: trimmedValue, items: [] }));
    }

    if (trimmedValue !== "" && trimmedValue.length > 2) {
      setTimeout(() => {
        const filteredItems = categories.filter((item: any) =>
          item?.title.toLocaleLowerCase().includes(trimmedValue)
        );

        shuffle(filteredItems);
        dispatch(
          setSearchData({ searchTerm: trimmedValue, items: filteredItems })
        );
      }, 500);
    }
  };

  return (
    <>
      <div className={styles.search__container}>
        <input
          className={styles.search__input}
          onChange={(e) => search(e.target.value)}
          placeholder="Type to get started"
          defaultValue={searchTerm}
        />
      </div>
      {serachedItems.length === 0 && searchTerm.length > 3 && (
        <div className={styles.search__container}>
          <p>No results found</p>
        </div>
      )}
      <div className={styles.category__items_container}>
        {serachedItems &&
          serachedItems.map((item) => (
            <CategoryItem key={item.id} item={item} isSearch={true} />
          ))}
      </div>
    </>
  );
};

export default Search;
