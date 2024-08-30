import React from "react";

import { RootState } from "@/lib/store/store";

import {
  clearStoreForDetailsPage,
  initializeStoreForServer,
} from "@/lib/store/serverSideStore";

import MusicCategory from "@/app/music/components/MusicCategory";
// import { isEmpty } from "@/utils/helpers";

const MuiscPage = async () => {
  const store = await clearStoreForDetailsPage(["music"]);
  const preloadedState = store.getState();

  console.log("preloadedState on music page", preloadedState);
  // console.log(
  //   "isEmpty(preloadedState.music)===",
  //   isEmpty(preloadedState.music.music)
  // );

  // if (isEmpty(preloadedState.music.music) || !preloadedState.music.music) {
  //   store = await initializeStoreForServer(["music"]);
  // }

  return (
    <MusicCategory preloadedState={preloadedState.music} isFirstPage={false} />
  );
};

export default MuiscPage;
