import { ComicsSliceState } from "@/lib/features/comics/comicsSlice";
import { RootState } from "@/lib/store/store";

export const comicDetailMock = {
  id: 1,
  name: "Amazing Spider-Man",
  description: "A classic comic about Spider-Man",
  image: "http://image/url/image",
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

export const comicFullDetailMock = {
  characters: { items: [{ name: "Spider-man" }] },
  collectedIssues: [],
  creators: {
    available: 2,
    items: [
      { name: "John Byrne", role: "Artist" },
      { name: "Stan Lee", role: "writer" },
    ],
  },
  dates: [{ type: "onsaleDate", date: "2024-10-01T00:00:00Z" }],
  description: "A classic comic about Spider-Man",
  diamondCode: "",
  digitalId: 0,
  ean: "",
  events: { available: 0, items: [] },
  format: "Comic",
  id: 1,
  images: [{ extension: ".jpg", path: "http://image/url/image" }],
  isbn: "",
  issn: "",
  issueNumber: 1224,
  modified: "",
  pageCount: 30,
  prices: [{ price: 4.99, type: "printPrice" }],
  resourceURI: "",
  series: {
    resourceURI: "http://gateway.marvel.com/v1/public/comics/121402",
    name: "Amazing Spider-Man",
  },
  stories: {
    items: [
      { name: "John Byrne", role: "Artist" },
      { name: "Stan Lee", role: "writer" },
    ],
  },
  textObjects: [],
  thumbnail: { extension: ".jpg", path: "http://image/url/thumbnail" },
  title: "",
  upc: "",
  urls: [],
  variantDescription: "",
  variants: [],
};

export const comicSliceMock: ComicsSliceState = {
  comics: {
    count: 1,
    limit: 10,
    offset: 0,
    results: [comicFullDetailMock],
  },
};
