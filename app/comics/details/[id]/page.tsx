import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryDataFromApi } from "@/lib/actions/getCategoryDataFromApi";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicDetails from "@/app/comics/components/ComicDetails";

const ComicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const item = await getCategoryDataFromApi(CategoryType.Comics, id);

  checkIfRedirected(item);

  return <ComicDetails preloadedState={item} />;
};

export default ComicDetailsPage;
