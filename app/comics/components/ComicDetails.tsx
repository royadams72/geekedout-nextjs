"use client";
import ItemDetails from "@/components/item-details/ItemDetails";
import Comic from "@/app/comics/components/Comic";
import { ComicDetail } from "@/types/interfaces/comic";

const ComicDetails = ({ preloadedState }: { preloadedState: ComicDetail }) => {
  return (
    <ItemDetails<ComicDetail> itemDetail={preloadedState}>
      <Comic comicDetails={preloadedState} />
    </ItemDetails>
  );
};

export default ComicDetails;
