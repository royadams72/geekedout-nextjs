import { getCategoryData } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicDetails from "@/app/comics/components/ComicDetails";

const ComicDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getCategoryData(CategoryType.Comics, id);

  return <ComicDetails preloadedState={item} />;
};

export default ComicDetailsPage;
