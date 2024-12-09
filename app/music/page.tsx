import { checkIfRedirected } from "@/lib/utils/redirect";

import { CategoryType } from "@/shared/enums/category-type.enum";

import { getCategoryDataFromApi } from "@/lib/services/getCategoryDataFromApi";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryDataFromApi(CategoryType.Music);

  checkIfRedirected(category);

  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
