import { checkIfRedirected } from "@/utils/helpers/";

import { CategoryType } from "@/shared/enums/category-type.enum";

import { getCategoryData } from "@/app/api/get-set-data/functions";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryData(CategoryType.Music);

  checkIfRedirected(category);

  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
