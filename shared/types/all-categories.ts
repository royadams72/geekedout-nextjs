import { ComicDetail } from "../interfaces/comic";
import { GameDetail } from "../interfaces/game";
import { MappedMovieDetail } from "../interfaces/movies";
import { AlbumDetail } from "../interfaces/music";

export type AllDetailsTypes =
  | MappedMovieDetail
  | ComicDetail
  | AlbumDetail
  | GameDetail
  | null;
