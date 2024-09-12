import { CategoryType } from "@/shared/enums/category-type.enum";
import MusicDetails from "../../components/MusicDetails";
import { getItemFromCache } from "@/lib/redis/redis";

const MusicDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getItemFromCache(CategoryType.Music, id);
  console.log(item);

  return <MusicDetails preloadedState={item} />;
};

export default MusicDetailsPage;
