"use client";

import { AlbumDetail } from "@/shared/interfaces/music";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Music from "@/app/music/components/Music";

const MusicDetails = ({ preloadedState }: { preloadedState: AlbumDetail }) => {
  return (
    <ItemDetails<AlbumDetail> itemDetail={preloadedState}>
      <Music albumDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MusicDetails;
