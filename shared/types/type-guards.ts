import { ComicDetail } from "../interfaces/comic";
import { GameDetail } from "../interfaces/game";
import { MappedMovieDetail } from "../interfaces/movies";
import { AlbumDetail } from "../interfaces/music";

export const isMappedMovieDetail = (
  detail: any
): detail is MappedMovieDetail => {
  return detail && "imdb_link" in detail;
};

export const isComicDetail = (detail: any): detail is ComicDetail => {
  return detail && "printPrice" in detail;
};

export const isAlbumDetail = (detail: any): detail is AlbumDetail => {
  return detail && "spotify_link" in detail;
};

export const isGameDetail = (detail: any): detail is GameDetail => {
  return detail && "platforms" in detail;
};
