import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { items } from "./items.mock";
import { ComicDetail } from "@/types/interfaces/comic";
import { CategoryType } from "@/types/enums/category-type.enum";

export const comicDetailMock: ComicDetail = {
  date_added: "2008-06-06 11:10:16",
  description: "This is the description.",
  id: "6",
  image:
    "https://comicvine.gamespot.com/a/uploads/scale_small/5/58993/2645776-chamber_of_chills__13_cgc_8.5.jpg",
  issue_number: "13",
  name: "Chamber of Chills Magazine",
  site_detail_url:
    "https://comicvine.gamespot.com/chamber-of-chills-magazine-13-the-lost-race/4000-6/",
  category: CategoryType.COMICS,
};

export const comicSliceMock: ComicsSliceState = {
  comics: {
    error: "",
    limit: 0,
    offset: 0,
    number_of_page_results: 0,
    number_of_total_results: 0,
    status_code: 0,
    results: items,
  },
};

export const comicsPreviewArray = [
  {
    category: "comics",
    id: 1,
    title: "Amazing Spider-Man",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/3/30/66df01b952153.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/3/30/66df01b952153/standard_fantastic.jpg",
  },
  {
    category: "comics",
    id: 121402,
    title: "Avengers Assemble (2024) #1 (Variant)",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/e/b0/66df01bff0ab2.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/e/b0/66df01bff0ab2/standard_fantastic.jpg",
  },
  {
    category: "comics",
    id: 121493,
    title: "Ultimate Black Panther (2024) #8 (Variant)",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/66df01e41202d.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/66df01e41202d/standard_fantastic.jpg",
  },
  {
    category: "comics",
    id: 2,
    title: "Venom War: Wolverine (2024) #1",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/7/20/66df026e93e49.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/7/20/66df026e93e49/standard_fantastic.jpg",
  },
  {
    category: "comics",
    id: 121402,
    title: "Venomverse Reborn (2024) #4 (Variant)",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/66df02486ae07.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/6/80/66df02486ae07/standard_fantastic.jpg",
  },
  {
    category: "comics",
    id: 121493,
    title: "Spider-Gwen: The Ghost-Spider (2024) #5 (Variant)",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/66df01b7518f3.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/6/80/66df01b7518f3/standard_fantastic.jpg",
  },
];
