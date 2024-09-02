import React from "react";

import ComicDetails from "@/app/comics/components/ComicDetails";

import { getItemFromCache } from "@/lib/redis";

const ComicDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getItemFromCache("comics", id);
  return <ComicDetails preloadedState={item} />;
};

export default ComicDetailsPage;
