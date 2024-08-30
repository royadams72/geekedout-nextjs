import React from "react";

import {
  clearStoreForDetailsPage,
  initializeStoreForServer,
} from "@/lib/store/serverSideStore";

import ComicsCategory from "./components/ComicsCategory";
import { isEmpty } from "@/utils/helpers";

const ComicsPage = async () => {
  let store = await clearStoreForDetailsPage(["comics"]);
  const preloadedState = store?.getState();
  // console.log(
  //   "isEmpty(preloadedState.comics)===",
  //   isEmpty(preloadedState.comics.comics)
  // );
  // if (isEmpty(preloadedState.comics.comics) || !preloadedState.comics.comics) {
  //   store = await initializeStoreForServer(["comics"]);
  // }

  return (
    <ComicsCategory
      isFirstPage={false}
      preloadedState={preloadedState.comics}
    />
  );
};

export default ComicsPage;
