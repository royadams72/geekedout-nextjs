import { getCategoryByNameFromCache } from "@/lib/redis";

import ComicsCategory from "./components/ComicsCategory";

const ComicsPage = async () => {
  const category = await getCategoryByNameFromCache("comics");
  return <ComicsCategory preloadedState={category} />;
};

export default ComicsPage;
