export interface Game {
  description: string;
  end_date: string;
  gamerpower_url: string;
  id: number;
  image: string;
  instructions: string;
  open_giveaway: string;
  open_giveaway_url: string;
  platforms: string;
  published_date: string;
  status: string;
  thumbnail: string;
  title: string;
  type: string;
  users: string;
  worth: string;
}

export interface GameDetail {
  category: string;
  description: string;
  gamerpower_url: string;
  id: string;
  image: string;
  instructions: string;
  name: string;
  platforms: string;
  published_date: string;
  type: string;
  worth: string;
}
