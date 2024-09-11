import { getCategoryByNameFromCache } from "@/lib/redis";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryByNameFromCache(CategoryType.Music);
  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
