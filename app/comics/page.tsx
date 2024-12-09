import { checkIfRedirected } from "@/lib/utils/error";

import { getCategoryDataFromApi } from "@/lib/services/getCategoryDataFromApi";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "@/app/comics/components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryDataFromApi(CategoryType.Comics);

  checkIfRedirected(category);

  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
