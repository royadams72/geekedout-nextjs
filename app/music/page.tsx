import React from "react";

import MusicCategory from "@/app/music/components/MusicCategory";
import { initializeStoreForServer } from "@/lib/store/serverSideStore";
import { RootState } from "@/lib/store/store";

const MuiscPage = async () => {
  const store = await initializeStoreForServer(["music"]);
  const preloadedState: RootState = store.getState();
  return <MusicCategory preloadedState={preloadedState.music} />;
};

export default MuiscPage;
