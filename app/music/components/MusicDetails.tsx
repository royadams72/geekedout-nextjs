"use client";

import { AlbumDetail } from "@/types/interfaces/music";

import ItemDetails from "@/components/item-details/ItemDetails";
import Music from "@/app/music/components/Music";
import { useSetCookieToClient } from "@/lib/hooks/useSetCookieToClient";

const MusicDetails = ({ preloadedState }: { preloadedState: AlbumDetail }) => {
  useSetCookieToClient(token);

  return (
    <ItemDetails<AlbumDetail> itemDetail={loadedState}>
      <Music albumDetails={loadedState} />
    </ItemDetails>
  );
};

export default MusicDetails;
