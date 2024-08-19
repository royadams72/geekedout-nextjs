import React from "react";

import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";
import { RootState } from "@/lib/store/store";
import MusicDetails from "../../components/MusicDetails";

const MusicDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const store = await initializeStoreForDetailsPage(["music"], id);
  const preloadedState: RootState = store.getState();

  return <MusicDetails preloadedState={preloadedState.music.selectedAlbum} />;
};

export default MusicDetailsPage;
