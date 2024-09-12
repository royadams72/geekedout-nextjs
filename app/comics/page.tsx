import { getCategoryData } from "@/app/api/redis-functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "@/app/comics/components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryData(CategoryType.Comics);
  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
