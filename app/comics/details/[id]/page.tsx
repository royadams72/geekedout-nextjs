import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/lib/actions/getCategoryData";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicDetails from "@/app/comics/components/ComicDetails";

const ComicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const item = await getCategoryData(CategoryType.Comics, id);

  checkIfRedirected(item);

  return <ComicDetails preloadedState={item} />;
};

export default ComicDetailsPage;
