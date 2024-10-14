import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { items } from "./items.mock";

export const comicDetailMock = {
  id: 1,
  name: "Amazing Spider-Man",
  description: "A classic comic about Spider-Man",
  image: "http://i.annihil.us/u/prod/marvel/i/mg/3/30/66df01b952153",
  onsaleDate: "2024-10-01T00:00:00Z",
  category: "comic",
  creators: [
    { name: "John Byrne", role: "Artist" },
    { name: "Stan Lee", role: "writer" },
  ],
  pageCount: 30,
  printPrice: 4.99,
  clickThrough: "http://clickThrough/url",
};

export const comicSliceMock: ComicsSliceState = {
  comics: {
    count: 1,
    limit: 10,
    offset: 0,
    results: items,
  },
};

export const mappedComicsArray = [
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
    id: 2,
    title: "Amazing Spider-Man",
    imageLarge: "http://i.annihil.us/u/prod/marvel/i/mg/3/30/66df01b952153.jpg",
    imageSmall:
      "http://i.annihil.us/u/prod/marvel/i/mg/3/30/66df01b952153/standard_fantastic.jpg",
  },
];
