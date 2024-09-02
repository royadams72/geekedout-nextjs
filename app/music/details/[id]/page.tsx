import MusicDetails from "../../components/MusicDetails";
import { getItemFromCache } from "@/lib/redis";

const MusicDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getItemFromCache("movies", id);
  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
