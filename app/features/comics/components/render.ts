import { useAppSelector } from "@/hooks/store.hooks";
import { selectComicsPreview } from "@/store/comics/comicsSlice";

export const render = (items: any) => {
  // const items = useAppSelector(selectComicsPreview);
  return items?.map((item: any) => `<li key={item.id}>{"${item.title}"}</li>`);
};
