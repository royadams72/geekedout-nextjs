import { Preview } from './preview';

export interface UiData {
   selectedId: string;
   selectedItem: any;
   pageLoading: boolean;
   loadedItems: LoadedItems;
   currPrevUrls: {
      currentUrl: string;
      previousUrl: string;
   };
   searchData: {
    searchTerm: string;
    items: Array<Preview>
   };
}

export interface LoadedItems {
  appInit: boolean;
  comicsLoaded: boolean;
  gamesLoaded: boolean;
  musicLoaded: boolean;
  moviesLoaded: boolean;
  musicDetails: boolean;
  movieDetails: boolean;
}
