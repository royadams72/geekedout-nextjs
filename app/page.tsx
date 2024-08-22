import { initializeStoreForServer } from "@/lib/store/serverSideStore";

import MoviesCategory from "./movies/components/MoviesCategory";
import { RootState } from "@/lib/store/store";

export default async function Home() {
  const store = await initializeStoreForServer(["movies"]);
  const preloadedState: RootState = store.getState();

  return <MoviesCategory preloadedState={preloadedState.movies} />;
}
