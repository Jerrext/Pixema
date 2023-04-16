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

export type CardListType = CardType[];

export enum MovieTabsNames {
  Videos = "Videos",
  Images = "Images",
}
