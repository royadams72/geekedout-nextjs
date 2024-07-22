import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import CategoryItem from "@/shared/components/CategoryItem";

import { selectMoviesLoaded, moviesLoaded } from "@/store/movies/moviesSlice";
import Link from "next/link";

const ComicsDisplay = async () => {
  // const dispatch = useAppDispatch();
  // const [items, setItems] = useState([]);
  // const isMoviesLoaded = useAppSelector(selectMoviesLoaded);

  const items = await fetch("http://localhost:3000/api/movies/all-movies", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("data=====", data.data.results);
      // dispatch(moviesLoaded(true));
      return data.data.results;

      // setItems(data.data.results);
      // console.log("items===", items.current);
    });

  return (
    <>
      <div>
        <Link href={"/"}>Back to main Page</Link>
      </div>
      <CategoryItem items={items} />

      {/* <Category<Preview>
        slot={
          <CategoryItem items={items}>
            {items?.map((item: any) => `${item.title}`)}
          </CategoryItem>
        }
        // items={it}
        itemsSelector={selectComicsPreview}
        statusSelector={selectStatus}
        fetchAction={getComics}
        itemRenderer={(comic) => `${comic.title}, ${comic.category}`}
        title="Comics Category"
      >
        what
        {/* <CategoryItem>
          {items?.map((item: any) => `${item.title}`)}
        </CategoryItem> */}
      {/* </Category> */}
    </>
  );
};

export default ComicsDisplay;
