import { checkIfRedirected } from "@/lib/utils/redirect";
import { getMusicDetailsFromApi } from "@/lib/services/getMusicDetailsFromApi";

import { AlbumDetail } from "@/shared/interfaces/music";

import MusicDetails from "@/app/music/components/MusicDetails";

const MusicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const item = await getMusicDetailsFromApi(id);

  checkIfRedirected(item);

  return <MusicDetails preloadedState={item as AlbumDetail} />;
};

export default MusicDetailsPage;
