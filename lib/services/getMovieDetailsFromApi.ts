import { ENV } from "@/lib/services/envService";
import { isEmpty } from "@/lib/utils/validation";
import { Movie, MovieDetail } from "@/types/interfaces/movies";
import { CategoryType } from "@/types/enums/category-type.enum";
import { ImageNotFound } from "@/types/enums/image-not-found.enum";

export const getMovieDetailsFromApi = async (
  id: number
): Promise<MovieDetail | {}> => {
  try {
    const response = await fetch(
      `${ENV.BASE_URL}/api/movies/movie-details/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.status}`);
    }
    return mapMovieDetail(data, id);
  } catch (error) {
    console.error(`Unable to load details getAllMovieApi(): ${error}`);
    return {};
  }
};

function mapMovieDetail(movie: Movie, id: number): MovieDetail | {} {
  if (isEmpty(movie)) {
    return {};
  }
  const {
    title: name,
    release_date,
    poster_path,
    homepage,
    imdb_id,
    genres,
    overview,
  } = movie;

  const genreNames = genres?.map((genre: { name: string }) => genre.name) || [];

  return {
    category: CategoryType.MOVIES,
    genres: genreNames,
    homepage: homepage!,
    id,
    imdb_link: imdb_id && `http://www.imdb.com/title/${imdb_id}`,
    image: poster_path
      ? `https://image.tmdb.org/t/p/w300${poster_path}`
      : ImageNotFound.SM,
    name,
    overview,
    release_date,
  };
}
