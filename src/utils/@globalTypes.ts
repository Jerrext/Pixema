import { Range } from "react-input-range";

export enum ButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
}

export type CardType = {
  id: number;
  name: string;
  release_date: string;
  year: string;
  tagline: string;
  poster: string;
  backdrop: string;
  runtime: number;
  budget: number;
  revenue: number;
  popularity: number;
  tmdb_id: number;
  imdb_id: string;
  is_series: boolean;
  adult: boolean;
  season_count: number;
  episode_count: number;
  series_ended: boolean;
  language: string;
  original_title: string;
  certification: string;
  rating: string;
  vote_count: number;
};

export type SearchCardType = {
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
  budget: null;
  revenue: null;
  views: number;
  popularity: number;
  imdb_id: string;
  tmdb_id: number;
  season_count: number;
  fully_synced: boolean;
  allow_update: boolean;
  created_at: null;
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
};

export type SearchListType = SearchCardType[];

export type CardListType = CardType[];

export enum MovieTabsNames {
  Videos = "Videos",
  Images = "Images",
}

export enum ModalWindowType {
  AddNewList,
  RemoveList,
  EditList,
  FilterWindow,
}

export type FiltersType = {
  page: number;
  order: string;
  type: string;
  genre: string[];
  released: Range;
  runtime: Range;
  score: Range;
  language: string;
  certification: string;
  country: string;
};
