import { UiData } from "@/types/interfaces/uiData";

export const uiDataMock = {
  currPrevUrls: {
    currentUrl: "/music",
    previousUrl: "/comics/details/118740",
  },
  isFirstPage: false,
  searchData: {
    searchTerm: "",
    items: [],
  },
  selectedItem: {},
  sessionId: "",
};

export const selectedItem = {
  onsaleDate: "2024-09-11T00:00:00-0400",
  creators: [
    {
      name: "Romulo Fajardo Jr.",
      role: "colorist (cover)",
    },
    {
      name: "Kev Walker",
      role: "inker",
    },
  ],
  description:
    "THE WOLVERINE IS…A ZOMBIOTE?! The only thing more dangerous than WOLVERINE - is Wolverine bonded to a mindless symbiote hungry for flesh! As ZOMBIOTES spread across NYC transforming everyone in their path into uncontrollable killing machines, Logan's only hope to save lives and avoid infection lies in returning to a dark chapter from his past. Logan slashes his way into a horror story from the twisted writing team behind Local Man and the incredible art of Kev Walker (MARVEL ZOMBIES, VENOM)!",
  image: "http://i.annihil.us/u/prod/marvel/i/mg/9/70/66d081ec45c6c.jpg",
  pageCount: 32,
  printPrice: 3.99,
  clickThrough:
    "http://marvel.com/comics/issue/118740/venom_war_wolverine_2024_1?utm_campaign=apiRef&utm_source=7f8ef27ce3f21548c1d09757433025a4",
  name: "Venom War: Wolverine (2024) #1",
  category: "comics",
  id: "118740",
};

export const searchData = {
  searchTerm: "man",
  items: [
    {
      category: "movies",
      id: 974635,
      imageLarge:
        "https://image.tmdb.org/t/p/w400/1126gjlBf4hTm9Sgf0ox3LGVEBt.jpg",
      imageSmall:
        "https://image.tmdb.org/t/p/w300/1126gjlBf4hTm9Sgf0ox3LGVEBt.jpg",
      title: "Hit Man",
    },
    {
      category: "comics",
      id: 121475,
      title: "Spider-Man: Reign 2 (2024) #3 (Variant)",
      imageLarge:
        "http://i.annihil.us/u/prod/marvel/i/mg/8/a0/66df021ba191b.jpg",
      imageSmall:
        "http://i.annihil.us/u/prod/marvel/i/mg/8/a0/66df021ba191b/standard_fantastic.jpg",
    },
    {
      category: "music",
      id: "287QQ922OsJYh8aFNGdJG5",
      imageLarge:
        "https://i.scdn.co/image/ab67616d00001e02613f62075c85e0b853318026",
      imageSmall:
        "https://i.scdn.co/image/ab67616d00004851613f62075c85e0b853318026",
      title: "Romance",
    },
    {
      category: "games",
      id: 147,
      imageLarge: "https://www.gamerpower.com/offers/1b/5eec9c8280d8d.jpg",
      title: "Free Too Human on Xbox 360 Giveaway",
    },
  ],
};

export const uiDataSliceMock: UiData = uiDataMock;
