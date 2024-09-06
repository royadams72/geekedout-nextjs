import ComicDetails from "@/app/comics/components/ComicDetails";

import { getItemFromCache } from "@/lib/redis";

import { CategoryType } from "@/shared/enums/category-type.enum";

const ComicDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getItemFromCache(CategoryType.Comics, id);

  return <ComicDetails preloadedState={item} />;
};

export default ComicDetailsPage;
