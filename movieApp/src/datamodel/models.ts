export interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface MovieResponse {
  page: number;
  results: Movie[];
}
