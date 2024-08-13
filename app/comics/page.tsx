import React from "react";
import ComicsCategory from "./components/ComicsCategory";
import { getComicsApi } from "@/lib/features/comics/comicsSlice";

const ComicsPage = async () => {
  const data = await getComicsApi();
  return <ComicsCategory data={data} />;
};

export default ComicsPage;
