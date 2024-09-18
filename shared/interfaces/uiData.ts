import { Preview } from "./preview";

export interface UiData {
  currPrevUrls: {
    currentUrl: string;
    previousUrl: string;
  };
  isFirstPage: boolean;
  searchData: {
    searchTerm: string;
    items: Array<Preview>;
  };
  selectedId: string;
  selectedItem: any;
  sessionId: string;
}
