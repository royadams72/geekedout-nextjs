import React from "react";

import ComicDetails from "@/app/comics/components/ComicDetails";
import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";

const ComicDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  let store = await initializeStoreForDetailsPage(["comics"], id);
  // store = await clearStoreServerSide(["comics"]);
  const preloadedState = store.getState();
  // console.log(preloadedState.comics);
  return <ComicDetails preloadedState={preloadedState.comics.selectedComic} />;
};

export default ComicDetailsPage;
