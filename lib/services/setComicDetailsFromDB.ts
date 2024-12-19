import { CategoryType } from "@/types/enums/category-type.enum";
import { ComicDetail, Comic, Items, Price } from "@/types/interfaces/comic";
import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";
import { isNotEmpty } from "../utils/validation";
import { ImageNotFound } from "@/types/enums/image-not-found.enum";
import { title } from "process";

export const setComicDetailsFromDB = async (
  id: string
): Promise<ComicDetail | {}> => {
  try {
    const storeData = await getCategoryFromDB(CategoryType.COMICS);
    console.log("storeData in comics", storeData);

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
    (comic: Comic) => comic.id?.toString() === id
  );
  console.log("item.title in comics", results[0].title);
  if (!item) {
    return {};
  }

  const {
    description,
    pageCount,
    prices,
    title: name,
    urls: [{ url: clickThrough }],
    images,
    dates: [{ date: onsaleDate }],
    creators: { items: creators },
  } = item;

  const selectedItem: ComicDetail = {
    onsaleDate: onsaleDate || "TBA",
    creators: creators.map((c: Items) => ({
      name: c.name,
      role: c.role || "unknown",
    })),
    description: description || "No Description",
    image: isNotEmpty(images)
      ? `${images[0].path}.${images[0].extension}`
      : ImageNotFound.SM,
    pageCount,
    printPrice: prices.find((c: Price) => c.type === "printPrice")?.price,
    clickThrough,
    name,
    category: CategoryType.COMICS,
    id,
  };

  return selectedItem;
};
