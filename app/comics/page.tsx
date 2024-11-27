import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "@/app/comics/components/ComicsCategory";

const ComicsPage = async () => {
  const response = await getCategoryData(CategoryType.Comics);
  const category = await response.json();

  checkIfRedirected(category);
  if (category.error) {
    return <div>Error: {category.error}</div>;
  }
  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
