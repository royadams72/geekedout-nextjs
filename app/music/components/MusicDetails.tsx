"use client";

import { AlbumDetail } from "@/shared/interfaces/music";

import ItemDetails from "@/shared/components/item-details/ItemDetails";
import Music from "@/app/music/components/Music";
import { useGetCookieFromState } from "@/lib/hooks/useGetCookieFromState";

const MusicDetails = ({ preloadedState }: { preloadedState: AlbumDetail }) => {
  const loadedState = useGetCookieFromState(preloadedState);

  return (
    <ItemDetails<AlbumDetail> itemDetail={loadedState}>
      <Music albumDetails={loadedState} />
    </ItemDetails>
  );
};

export default MusicDetails;
