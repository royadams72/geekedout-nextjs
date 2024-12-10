import { ComicDetail } from "./comic";
import { GameDetail } from "./game";
import { MovieDetail } from "./movies";
import { AlbumDetail } from "./music";

export type AllDetailsTypes =
  | MovieDetail
  | ComicDetail
  | AlbumDetail
  | GameDetail
  | null;
