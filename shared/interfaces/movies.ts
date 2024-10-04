export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesImageData {
  backdrop_sizes: Array<string>;
  base_url: string;
  logo_sizes: Array<string>;
  poster_sizes: Array<string>;
  profile_sizes: Array<string>;
  secure_base_url: string;
  still_sizes: Array<string>;
}

export interface MovieDetail {
  category: string;
  genres: Array<string>;
  homepage: string;
  image: string;
  id: number;
  imdb_link: string;
  overview: string;
  release_date: string;
  name: string;
}
export interface MoviesStore {
  dates?: { maximun: string; minimum: string };
  page?: number;
  results: Movie[];
  total_pages?: number;
  total_results?: number;
}
