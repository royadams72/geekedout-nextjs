import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryData } from "@/lib/actions/getCategoryData";

import { CategoryType } from "@/shared/enums/category-type.enum";

import MovieDetails from "@/app/movies/components/MovieDetails";

const MappedMovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const item = await getCategoryData(CategoryType.Movies, id);

  checkIfRedirected(item);

  return <MovieDetails preloadedState={item} />;
};

export default MappedMovieDetailsPage;
