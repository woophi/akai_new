type MovieDBResponseModel<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
export type MoviDBSearchModel = MovieDBResponseModel<MovieDBSearchResult>;
export type MoviDBTrendingModel = MovieDBResponseModel<TrendingTV | TrendingMovie | TrendingPerson>;

export type MovieDBSearchResult = {
  backdrop_path: string;
  /**
   * format YYYY-MM-DD
   */
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  /**
   * about
   */
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type MovieCreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type MovieGeners = {
  id: number;
  name: string;
};

export type MovieEpisodeToAir = {
  /**
   * format YYYY-MM-DD
   */
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  /**
   * img
   */
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type MovieNetworks = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type MovieProdCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};
export type MovieProdCountry = {
  iso_3166_1: string;
  name: string;
};

export type MovieTvShowSeason = {
  /**
   * format YYYY-MM-DD
   */
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
};

export type MovieLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export enum MovieTvShowStatus {
  OnGoing = 'Returning Series',
  Ended = 'Ended',
  Production = 'In Production',
}

export type MovieDBTVShow = {
  backdrop_path: string;
  created_by: MovieCreatedBy[];
  /**
   * [45 minutes]
   */
  episode_run_time: number[];
  /**
   * format YYYY-MM-DD
   */
  first_air_date: string;
  genres: MovieGeners[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  /**
   * format YYYY-MM-DD
   */
  last_air_date: string | null;
  last_episode_to_air: MovieEpisodeToAir | null;
  name: string;
  next_episode_to_air: MovieEpisodeToAir | null;
  networks: MovieNetworks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieProdCompany[];
  production_countries: MovieProdCountry[];
  seasons: MovieTvShowSeason[];
  spoken_languages: MovieLanguage[];
  status: MovieTvShowStatus;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
} & TVCredits;

export enum TrendingMediaType {
  All = 'all',
  Movie = 'movie',
  TV = 'tv',
  Person = 'person',
}
export enum TrendingPeriod {
  Day = 'day',
  Week = 'week',
}

export type TrendingTV = {
  id: number;
  name: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  /**
   * format YYYY-MM-DD
   */
  first_air_date: string;
  poster_path: string;
  original_name: string;
  origin_country: string[];
  vote_average: number;
  overview: string;
  vote_count: number;
  popularity: number;
  media_type: TrendingMediaType.TV;
};
export type TrendingMovie = {
  /**
   * format YYYY-MM-DD
   */
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  poster_path: string | null;
  vote_count: number;
  video: boolean;
  vote_average: number;
  title: string;
  overview: string;
  popularity: number;
  media_type: TrendingMediaType.Movie;
};

export type TrendingPerson = {
  adult: boolean;
  gender: number;
  name: string;
  id: number;
  known_for: (TrendingMovie | TrendingTV)[];
  known_for_department: string;
  profile_path: string;
  popularity: number;
  media_type: TrendingMediaType.Person;
};

// known_for_department: 'Acting' | 'Writing' | 'Production' | 'Directing'
// department: 'Production';
//       job: 'Producer' | 'Executive Producer' | Writer;

export type TVCreditCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
};

export type TVCreditCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};
export type TVCredits = {
  cast: TVCreditCast[];
  crew: TVCreditCrew[];
};

export type MovieDBPersonInfo = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string;
  combined_credits: {
    cast: (TrendingMovie | TrendingTV)[];
  };
};
