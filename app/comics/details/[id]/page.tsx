import React from "react";

import ComicDetails from "../../components/ComicDetails";
import { initializeStoreForDetailsPage } from "@/lib/store/serverSideStore";
import { setComicDetailsServerSide } from "@/lib/features/comics/comicsSlice";

const ComicDetailsPage = async({ params: { id } }: { params: { id: string } }) => {
  const store = await initializeStoreForDetailsPage(id, setComicDetailsServerSide);
  const preloadedState = store.getState()
  return <ComicDetails preloadedState={preloadedState.comics.selectedComic} />;
};

export default ComicDetailsPage;
