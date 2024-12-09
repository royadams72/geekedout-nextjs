import { checkIfRedirected } from "@/lib/utils/redirect";

import { getCategoryDataFromApi } from "@/lib/services/getCategoryDataFromApi";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicDetails from "../../components/MusicDetails";

const MusicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const item = await getCategoryDataFromApi(CategoryType.Music, id);

  checkIfRedirected(item);

  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
