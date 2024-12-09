import { checkIfRedirected } from "@/lib/utils/redirect";
import { getMovieDetailsFromApi } from "@/lib/services/getMovieDetailsFromApi";

import { MovieDetail } from "@/shared/interfaces/movies";

import MovieDetails from "@/app/movies/components/MovieDetails";

const MappedMovieDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;
  const item = await getMovieDetailsFromApi(id);

  checkIfRedirected(item);

  return <MovieDetails preloadedState={item as MovieDetail} />;
};

export default MappedMovieDetailsPage;
