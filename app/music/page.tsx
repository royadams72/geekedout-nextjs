import { checkIfRedirected } from "@/utils/helpers";

import { CategoryType } from "@/shared/enums/category-type.enum";

import { getCategoryData } from "@/lib/actions/getCategoryData";

import MusicCategory from "@/app/music/components/MusicCategory";

const MuiscPage = async () => {
  const category = await getCategoryData(CategoryType.Music);

  checkIfRedirected(category);

  return <MusicCategory preloadedState={category} />;
};

export default MuiscPage;
