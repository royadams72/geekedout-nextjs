import Category2 from "@/shared/components/category/Category2";
import { getComicsApi } from "@/lib/features/comics/comicsSlice";

const ComicsDisplay = async () => {
  // Fetch data on the server side
  const data = await getComicsApi();

  return <Category2 data={data} />;
};

export default ComicsDisplay;
