export type UserResponseData = {
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

export type UserErrorsData = {
  message: string;
  errors: {
    email: string[];
    password: string[];
  };
};
