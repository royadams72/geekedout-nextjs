import ComicsDisplayClient from "./ComicsClient";
import { getComicsApi } from "@/lib/features/comics/comicsSlice";

const ComicsDisplay = async () => {
  // Fetch data on the server side
  const data = await getComicsApi();

  return <ComicsDisplayClient data={data} />;
};

export default ComicsDisplay;
