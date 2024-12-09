import { checkIfRedirected } from "@/lib/utils/redirect";

import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

import { CategoryType } from "@/shared/enums/category-type.enum";

import ComicsCategory from "@/app/comics/components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryFromDB(CategoryType.COMICS);

  checkIfRedirected(category);

  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
