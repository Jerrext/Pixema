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

export type MoviesResponseData = {
  pagination: {
    current_page: number;
    data: CardListType;
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
    status: string;
  };
  status: string;
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

export type UserResponseData = {
  user: UserData;
  status: string;
};
