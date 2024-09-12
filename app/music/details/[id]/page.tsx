import { getCategoryItem } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicDetails from "../../components/MusicDetails";

const MusicDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getCategoryItem(CategoryType.Music, id);
  console.log(item);

  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
