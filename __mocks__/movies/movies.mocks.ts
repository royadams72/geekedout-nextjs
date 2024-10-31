import { MoviesSliceState } from "@/lib/features/movies/moviesSlice";
import { MusicSliceState } from "@/lib/features/music/musicSlice";
import { Movie, MovieDetail, MoviesStore } from "@/shared/interfaces/movies";

export const MovieDetailMock: MovieDetail = {
  category: "movies",
  genres: ["Horror", "Science Fiction", "Thriller"],
  homepage: "https://www.aquietplacemovie.com",
  id: 762441,
  imdb_link: "http://www.imdb.com/title/tt13433802",
  image: "https://image.tmdb.org/t/p/w300/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
  name: "A Quiet Place: Day One",
  overview:
    "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.",
  release_date: "2024-06-26",
};

export const movieFullDetailMock: Movie[] = [
  {
    adult: false,
    backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    genre_ids: [16, 10751, 12, 35],
    id: 1022789,
    original_language: "en",
    original_title: "Inside Out 2",
    overview:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    popularity: 5393.121,
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    release_date: "2024-06-14",
    title: "Inside Out 2",
    video: false,
    vote_average: 7.734,
    vote_count: 1193,
  },
  {
    adult: false,
    backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
    genre_ids: [28, 12, 878],
    id: 786892,
    original_language: "en",
    original_title: "Furiosa: A Mad Max Saga",
    overview:
      "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    popularity: 6058.314,
    poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
    release_date: "2024-05-24",
    title: "Furiosa: A Mad Max Saga",
    video: false,
    vote_average: 7.71,
    vote_count: 1580,
  },
  {
    adult: false,
    backdrop_path: "/whnFKx0Y54Ktg6o2TiwbnQfXdZf.jpg",
    genre_ids: [27, 9648, 14],
    id: 1086747,
    original_language: "en",
    original_title: "The Watchers",
    overview:
      "A young artist gets stranded in an extensive, immaculate forest in western Ireland, where, after finding shelter, she becomes trapped alongside three strangers, stalked by mysterious creatures each night.",
    popularity: 1096.842,
    poster_path: "/vZVEUPychdvZLrTNwWErr9xZFmu.jpg",
    release_date: "2024-06-07",
    title: "The Watchers",
    video: false,
    vote_average: 6.5,
    vote_count: 304,
  },
];

export const movieSliceMock: MoviesSliceState = {
  movies: {
    dates: {
      maximum: "2024-07-03",
      minimum: "2024-05-22",
    },
    page: 1,
    results: movieFullDetailMock,
    total_pages: 9,
    total_results: 180,
  },
};
