import { checkIfRedirected } from "@/lib/utils/redirect";
import {
  getMusicDetailsFromApi,
  mapAlbumDetail,
} from "@/lib/services/getMusicDetailsFromApi";

import { AlbumDetail } from "@/types/interfaces/music";

import MusicDetails from "@/app/music/components/MusicDetails";
import { getCookie } from "@/lib/actions/getCookie";
import { CookieNames } from "@/types/enums/cookie-names.enum";
import { ApiPaths } from "@/types/enums/paths.enums";

const MusicDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const { item, cookieData } = await getMusicDetailsFromApi(id);

  checkIfRedirected(item);

  return (
    <MusicDetails token={cookieData} preloadedState={item as AlbumDetail} />
  );
};

export default MusicDetailsPage;
