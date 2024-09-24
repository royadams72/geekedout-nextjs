import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicDetails from "../../components/MusicDetails";

const MusicDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getCategoryData(CategoryType.Music, id);

  checkIfRedirected(item);

  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
