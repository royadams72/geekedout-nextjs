import { getCategoryByNameFromCache } from "@/lib/redis/redis";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicCategory from "@/app/music/components/MusicCategory";
import { getCategoryData } from "@/lib/redis/redis-functions";

const MuiscPage = async () => {
  const category = await getCategoryData(CategoryType.Music);
  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
