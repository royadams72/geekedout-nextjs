import { checkIfRedirected } from "@/lib/utils/redirect";

import { ComicDetail } from "@/types/interfaces/comic";

import { setComicDetailsFromDB } from "@/lib/services/setComicDetailsFromDB";

import ComicDetails from "@/app/comics/components/ComicDetails";

const ComicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const item = await setComicDetailsFromDB(id);

  checkIfRedirected(item);

  return <ComicDetails preloadedState={item as ComicDetail} />;
};

export default ComicDetailsPage;
