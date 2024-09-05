import { Preview } from "./preview";

export interface UiData {
  selectedId: string;
  selectedItem: any;
  isFirstPage: boolean;
  currPrevUrls: {
    currentUrl: string;
    previousUrl: string;
  };
  searchData: {
    searchTerm: string;
    items: Array<Preview>;
  };
}
