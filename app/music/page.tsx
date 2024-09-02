import { getCategoryByNameFromCache } from "@/lib/redis";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryByNameFromCache("games");
  return <MusicCategory preloadedState={category} isFirstPage={false} />;
};

export default MuiscPage;
