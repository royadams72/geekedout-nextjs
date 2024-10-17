import { comicSliceMock } from "./comics/comics.mocks";
import { gamesSliceMock } from "./games.mocks";
import { movieSliceMock } from "./movies.mock";
import { musicSliceMock } from "./music.mocks";
import { uiDataSliceMock } from "./uiData.mocks";

export const rootStateMock = {
  comics: comicSliceMock,
  games: gamesSliceMock,
  movies: movieSliceMock,
  music: musicSliceMock,
  uiData: uiDataSliceMock,
};
