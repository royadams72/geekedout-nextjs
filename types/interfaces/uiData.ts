import { Preview } from "./preview";

export interface UiData {
  currPrevUrls: {
    currentUrl: string;
    previousUrl: string;
  };
  isFirstPage: boolean | undefined;
  searchData: {
    searchTerm: string;
    items: Array<Preview>;
  };
  selectedItem: any;
  sessionId: string;
}
