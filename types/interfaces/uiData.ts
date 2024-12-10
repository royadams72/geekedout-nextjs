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
  selectedItem: any;
  sessionId: string;
}
