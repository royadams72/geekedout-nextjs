import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/lib/actions/getCategoryData";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MusicDetails from "../../components/MusicDetails";

const MusicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const item = await getCategoryData(CategoryType.Music, id);

  checkIfRedirected(item);

  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
