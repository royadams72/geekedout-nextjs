import { GamesSliceState } from "@/lib/features/games/gamesSlice";

import { Game, GameDetail } from "@/shared/interfaces/game";

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

export const gameFullDetailMock: Game = {
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
};

export const gamesSliceMock: GamesSliceState = {
  games: [gameFullDetailMock],
};
