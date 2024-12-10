import { checkIfRedirected } from "@/lib/utils/redirect";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

import { CategoryType } from "@/types/enums/category-type.enum";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryFromDB(CategoryType.MUSIC);

  checkIfRedirected(category);

  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
