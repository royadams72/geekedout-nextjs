import { GamesSliceState } from "@/lib/features/games/gamesSlice";

import { Game, GameDetail } from "@/types/interfaces/game";

export const gameSelectedMock: GameDetail = {
  category: "games",
  description:
    "Claim your free Gift Pack Key and unlock several in-game items for Eternal Fury! Each pack unlocks Diamonds, Scrolls and more!",
  gamerpower_url: "https://www.gamerpower.com/eternal-fury-gift-pack-key",
  id: 2677,
  image: "https://www.gamerpower.com/offers/1b/6575ed1da500f.jpg",
  instructions:
    "1. Login into your free MMOBomb account and click the button to unlock your key.\r\n2. Follow the giveaway instructions to redeem your key.",
  name: "Eternal Fury Gift Pack Key",
  platforms: "PC",
  published_date: "2024-07-09 09:10:01",
  type: "DLC",
  worth: "N/A",
};

export const gamesFullDetailMockArray: Game[] = [
  {
    id: 2677,
    title: "Eternal Fury Gift Pack Key",
    worth: "N/A",
    thumbnail: "https://www.gamerpower.com/offers/1/6575ed1da500f.jpg",
    image: "https://www.gamerpower.com/offers/1b/6575ed1da500f.jpg",
    description:
      "Claim your free Gift Pack Key and unlock several in-game items for Eternal Fury! Each pack unlocks Diamonds, Scrolls and more!",
    instructions:
      "1. Login into your free MMOBomb account and click the button to unlock your key.\r\n2. Follow the giveaway instructions to redeem your key.",
    open_giveaway_url:
      "https://www.gamerpower.com/open/eternal-fury-gift-pack-key",
    published_date: "2024-07-09 09:10:01",
    type: "DLC",
    platforms: "PC",
    end_date: "2024-12-31 23:59:59",
    users: 840,
    status: "Active",
    gamerpower_url: "https://www.gamerpower.com/eternal-fury-gift-pack-key",
    open_giveaway: "https://www.gamerpower.com/open/eternal-fury-gift-pack-key",
  },
  {
    id: 2885,
    title: "The Falconeer (Epic Games) Giveaway",
    worth: "$19.99",
    thumbnail: "https://www.gamerpower.com/offers/1/6686b93a6a5b0.jpg",
    image: "https://www.gamerpower.com/offers/1b/6686b93a6a5b0.jpg",
    description:
      "Ever dreamed of flying through the skies as a giant bird? Just me?! This week, you can download The Falconeer for free on the Epic Games Store. In this air combat game, you'll engage in epic aerial dogfights and experience the exhilarating freedom of flying a massive bird across a breathtaking open world. Don't miss out on this chance to unleash your inner Falconer!",
    instructions:
      '1. Click the "Get Giveaway" button to visit the giveaway page.\r\n2. Login into your Epic Games Store account.\r\n3. Click the button to add the game to your library',
    open_giveaway_url:
      "https://www.gamerpower.com/open/the-falconeer-epic-games-giveaway",
    published_date: "2024-07-04 11:01:14",
    type: "Game",
    platforms: "PC, Epic Games Store",
    end_date: "2024-07-11 23:59:00",
    users: 7440,
    status: "Active",
    gamerpower_url:
      "https://www.gamerpower.com/the-falconeer-epic-games-giveaway",
    open_giveaway:
      "https://www.gamerpower.com/open/the-falconeer-epic-games-giveaway",
  },
  {
    id: 905,
    title: "Free Larger Than Light (itch.io) Giveaway",
    worth: "$5.00",
    thumbnail: "https://www.gamerpower.com/offers/1/60b608dd99d89.jpg",
    image: "https://www.gamerpower.com/offers/1b/60b608dd99d89.jpg",
    description:
      "Grab Larger Than Light for free on itch.io!  Larger Than Light is a 2.5D puzzle platform game with fully voiced dialogue. Download now!",
    instructions:
      '1. Click the button "Download or Claim" before the offer expires.\r\n2. Login into your itch.io account to access the game.',
    open_giveaway_url: "https://www.gamerpower.com/open/free-larger-than-light",
    published_date: "2024-07-03 08:53:04",
    type: "Game",
    platforms: "PC, Itch.io, DRM-Free",
    end_date: "N/A",
    users: 24610,
    status: "Active",
    gamerpower_url: "https://www.gamerpower.com/free-larger-than-light",
    open_giveaway: "https://www.gamerpower.com/open/free-larger-than-light",
  },
];

export const gamesSliceMock: GamesSliceState = {
  games: gamesFullDetailMockArray,
};
