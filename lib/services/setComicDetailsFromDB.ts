import { CategoryType } from "@/types/enums/category-type.enum";
import { ComicDetail, Comic, Items, Price } from "@/types/interfaces/comic";
import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

export const setComicDetailsFromDB = async (
  id: string
): Promise<ComicDetail | {}> => {
  try {
    const storeData = await getCategoryFromDB(CategoryType.COMICS);
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

  if (!item) {
    return {};
  }

  const {
    description,
    pageCount,
    prices,
    title: name,
    urls: [{ url: clickThrough }],
    images: [{ path, extension }],
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
    image: `${path}.${extension}`,
    pageCount,
    printPrice: prices.find((c: Price) => c.type === "printPrice")?.price,
    clickThrough,
    name,
    category: CategoryType.COMICS,
    id,
  };

  return selectedItem;
};
