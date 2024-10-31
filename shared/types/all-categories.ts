import { ComicDetail } from "../interfaces/comic";
import { GameDetail } from "../interfaces/game";
import { MovieDetail } from "../interfaces/movies";
import { AlbumDetail } from "../interfaces/music";

export type AllDetailsTypes =
  | MovieDetail
  | ComicDetail
  | AlbumDetail
  | GameDetail
  | null;
