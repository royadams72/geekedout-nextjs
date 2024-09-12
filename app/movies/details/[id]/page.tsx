import { getCategoryItem } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MovieDetails from "../../components/MovieDetails";

const MovieDetailsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const item = await getCategoryItem(CategoryType.Movies, id);
  return <MovieDetails preloadedState={item} />;
};

export default MovieDetailsPage;
