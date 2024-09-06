import { CategoryType } from "@/shared/enums/category-type.enum";
import MovieDetails from "../../components/MovieDetails";
import { getItemFromCache } from "@/lib/redis";

const MovieDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getItemFromCache(CategoryType.Movies, id);
  return <MovieDetails preloadedState={item} />;
};

export default MovieDetailsPage;
