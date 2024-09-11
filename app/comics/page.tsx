import { getCategoryByNameFromCache } from "@/lib/redis";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "./components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryByNameFromCache(CategoryType.Comics);
  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
