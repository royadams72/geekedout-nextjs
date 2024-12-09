import { Movie, MovieDetail } from "@/shared/interfaces/movies";
import { isEmpty } from "../utils/validation";
import { CategoryType } from "@/shared/enums/category-type.enum";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMovieDetailsFromApi = async (
  id: number
): Promise<MovieDetail | {}> => {
  try {
    const response = await fetch(`${BASE_URL}/api/movies/movie-details/${id}`, {
      method: "GET",
    });
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
    imdb_link: `http://www.imdb.com/title/${imdb_id}`,
    image: `https://image.tmdb.org/t/p/w300${poster_path}`,
    name,
    overview,
    release_date,
  };
}
