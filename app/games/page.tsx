import React from "react";

import {
  clearStoreForDetailsPage,
  initializeStoreForServer,
} from "@/lib/store/serverSideStore";

const GamesPage = async () => {
  const response = await fetch(
    "http://localhost:3000/api/games/setGamesServerSide/",
    {
      method: "GET",
    }
  );
  const gamesPreview = await response.json();
  console.log(gamesPreview);

  // let store = await clearStoreForDetailsPage(["games"]);
  // const preloadedState = store.getState();
  // console.log(
  //   "isEmpty(preloadedState.games)===",
  //   isEmpty(preloadedState.games.games)
  // );
  // if (isEmpty(preloadedState.games.games) || !preloadedState.games.games) {
  //   store = await initializeStoreForServer(["games"]);
  // }
  return (
    <>Games page</>
    // <GamesCategory preloadedState={preloadedState.games} isFirstPage={false} />
  );
};

export default GamesPage;
