import { CardListType } from "src/utils/@globalTypes";

export type UserSignInResponseData = {
  themes: {};
  user: UserSignInData;
  menus: [];
  locales: [];
  status: string;
};

export type UserErrorsData = {
  message: string;
  errors: {
    email: string[];
    password: string[];
  };
};

export type UserSignInData = {
  first_name: null;
  last_name: null;
  language: string;
  country: null;
  timezone: null;
  email_verified_at: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
  access_token: string;
  display_name: string;
  has_password: boolean;
  model_type: string;
  watchlist: null;
};

type PaginationData<T> = {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: [];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
};

export type UserData = {
  id: number;
  username: null;
  email: string;
  api_token: null;
  activated: number;
  activation_code: null;
  activated_at: null;
  last_login: null;
  persist_code: null;
  reset_password_code: null;
  first_name: null;
  last_name: null;
  gender: null;
  avatar: string;
  created_at: string;
  updated_at: string;
  background: null;
  confirmed: number;
  confirmation_code: null;
  language: string;
  country: null;
  timezone: null;
  stripe_id: null;
  available_space: null;
  card_brand: null;
  card_last_four: null;
  email_verified_at: string;
  display_name: string;
  has_password: true;
  model_type: string;
};

export type SingleMovieImage = {
  id: number;
  url: string;
  type: string;
  source: string;
};

type SingleMovieGenres = {
  id: number;
  type: string;
  name: string;
  display_name: string;
};

export type SingleMovieCredits = {
  id: number;
  name: string;
  poster: string;
  model_type: string;
  pivot: {
    creditable_id: number;
    person_id: number;
    creditable_type: string;
    id: number;
    job: string;
    department: string;
    order: number;
    character: null;
  };
};

export type SingleMovieVideos = {
  id: number;
  name: string;
  thumbnail: null;
  url: string;
  type: string;
  quality: null;
  title_id: number;
  episode_id: null;
  season_num: null;
  episode_num: null;
  source: string;
  negative_votes: number;
  positive_votes: number;
  reports: number;
  approved: boolean;
  order: number;
  created_at: string;
  updated_at: string;
  user_id: null;
  language: string;
  category: string;
  score: null;
  model_type: string;
  captions: [];
  latest_play: null;
};

export type SingleMovieData = {
  id: number;
  name: string;
  type: string;
  release_date: string;
  year: number;
  description: string;
  genre: null;
  tagline: string;
  poster: string;
  backdrop: string;
  runtime: number;
  trailer: null;
  budget: number;
  revenue: number;
  views: number;
  popularity: number;
  imdb_id: string;
  tmdb_id: number;
  season_count: number;
  fully_synced: boolean;
  allow_update: boolean;
  created_at: string;
  updated_at: string;
  language: string;
  country: null;
  original_title: string;
  affiliate_link: null;
  certification: string;
  episode_count: number;
  series_ended: boolean;
  is_series: boolean;
  show_videos: boolean;
  adult: boolean;
  rating: string;
  model_type: string;
  vote_count: number;
  images: SingleMovieImage[];
  genres: SingleMovieGenres[];
  seasons: [];
  videos: SingleMovieVideos[];
  credits: SingleMovieCredits[];
};

export type ListData = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  system: boolean;
  public: boolean;
  auto_update: null;
  created_at: string;
  updated_at: string;
  style: null;
  image: string;
  model_type: string;
};

type GetListData = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  system: boolean;
  public: boolean;
  auto_update: null;
  created_at: string;
  updated_at: string;
  style: null;
  image: string;
  model_type: string;
  user: UserData;
};

type AddToListData = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  system: boolean;
  public: boolean;
  auto_update: null;
  created_at: string;
  updated_at: string;
  style: null;
  image: string;
  model_type: string;
  items: CardListType;
};

type CreateListData = {
  name: string;
  description: string;
  auto_update: null;
  public: boolean;
  user_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  model_type: string;
};

export type UserResponseData = {
  user: UserData;
  status: string;
};

export type SingleMovieResponseData = {
  title: SingleMovieData;
  status: string;
};

export type MoviesResponseData = {
  pagination: PaginationData<CardListType>;
  status: string;
};

export type RecommendationMoviesResponseData = {
  titles: CardListType;
  status: string;
};

export type MyListResponseData = {
  items: PaginationData<CardListType>;
  list: GetListData;
  status: string;
};

export type ChangeListResponseData = {
  list: AddToListData;
  status: string;
};

export type CreateListResponseData = {
  list: CreateListData;
  status: string;
};

export type GetListsResponseData = {
  pagination: PaginationData<ListData[]>;
  status: string;
};
