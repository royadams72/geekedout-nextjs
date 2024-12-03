import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/lib/actions/getCategoryData";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "@/app/comics/components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryData(CategoryType.Comics);

  checkIfRedirected(category);

  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
