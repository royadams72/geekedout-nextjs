import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { items } from "./items.mock";
import { ComicDetail } from "@/types/interfaces/comic";

export const comicDetailMock: ComicDetail = {
  name: items[0].title,
  description: items[0].description,
  id: items[0].id,
  image: items[0].images[0].path,
  category: "comic",
  creators: [
    { name: "John Byrne", role: "Artist" },
    { name: "Stan Lee", role: "writer" },
  ],
  onsaleDate: "2024-10-01T00:00:00Z",
  pageCount: 30,
  printPrice: 4.99,
  clickThrough: "http://gateway.marvel.com/v1/public/series/32866",
};

export const comicSliceMock: ComicsSliceState = {
  comics: {
    count: 1,
    limit: 10,
    offset: 0,
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
