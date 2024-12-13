"use client";

import { AlbumDetail } from "@/types/interfaces/music";

import ItemDetails from "@/components/item-details/ItemDetails";
import Music from "@/app/music/components/Music";
import { useSetCookieToClient } from "@/lib/hooks/useSetCookieToClient";

const MusicDetails = ({
  preloadedState,
  token,
}: {
  preloadedState: AlbumDetail;
  token?: any;
}) => {
  useSetCookieToClient(token);

  return (
    <ItemDetails<AlbumDetail> itemDetail={preloadedState}>
      <Music albumDetails={preloadedState} />
    </ItemDetails>
  );
};

export default MusicDetails;
