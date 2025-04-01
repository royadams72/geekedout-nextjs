import { CategoryType } from "@/types/enums/category-type.enum";
import { ComicDetail, Comic } from "@/types/interfaces/comic";
import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";
import { isNotEmpty } from "../utils/validation";
import { ImageNotFound } from "@/types/enums/image-not-found.enum";
import { ENV } from "./envService";

// export const setComicDetailsFromDB = async (id: number) => {
//   try {
//     const response = await fetch(
//       `https://comicvine.gamespot.com/api/issue/1100494/?api_key=${ENV.COMIC_VINE_APIKEY}&sort=date_added:desc&format=json`,
//       {
//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     console.log(data);

//     // if (!response.ok) {
//     //   throw new Error(`Failed to fetch movie: ${response.status}`);
//     // }
//     // return mapMovieDetail(data, id);
//   } catch (error) {
//     console.error(`Unable to load details getAllMovieApi(): ${error}`);
//     return {};
//   }
// };
export const setComicDetailsFromDB = async (
  id: string
): Promise<ComicDetail | {}> => {
  try {
    const storeData = await getCategoryFromDB(CategoryType.COMICS);
    // console.log("storeData in comics", storeData.comics);

    if (!storeData) {
      throw new Error("Could not get comics storeData from DB");
    }
    return mapComicDetail(storeData, id);
  } catch (error) {
    console.error(`error in setComicDetailsFromDB: ${error}`);
    return {};
  }
};

const mapComicDetail = (
  comics: ComicsSliceState,
  id: string
): ComicDetail | {} => {
  const results = comics.comics.results || [];
  const item: Comic | undefined = results.find(
    (comic: Comic) => String(comic.id) === id
  );

  if (!item) {
    return {};
  }

  const {
    volume: { name: altName },
    description,
    name,
    site_detail_url,
    date_added,
    image: { small_url },
    issue_number,
  } = item;

  const selectedItem: ComicDetail = {
    date_added: date_added || "TBA",
    description: description || "No Description",
    image: isNotEmpty(small_url) ? small_url : ImageNotFound.SM,
    issue_number,
    site_detail_url,
    name: name || altName,
    category: CategoryType.COMICS,
    id,
  };

  return selectedItem;
};
