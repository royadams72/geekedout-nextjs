"use client";
import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Comic from "@/app/comics/components/Comic";
import { ComicDetail } from "@/shared/interfaces/comic";

const ComicDetails = ({ preloadedState }: { preloadedState: ComicDetail }) => {
  return (
    <ItemDetails<ComicDetail> itemDetail={preloadedState}>
      <Comic comicDetails={preloadedState} />
    </ItemDetails>
  );
};

export default ComicDetails;
