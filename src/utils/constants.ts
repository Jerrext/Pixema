import { getCurrentYear } from "./functions";

export const reg =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

export const ACCESS_TOKEN_KEY = "access_token";

export const THEME = "theme";

export const PER_PAGE = 12;

export const RELEASED_RANGE = {
  max: getCurrentYear(),
  min: 1880,
};

export const RUNTIME_RANGE = {
  max: 255,
  min: 1,
};

export const SCORE_RANGE = {
  max: 9.9,
  min: 1,
};

export const FILTERS_RESET = {
  page: 1,
  order: "",
  type: "",
  genre: [],
  released: RELEASED_RANGE,
  runtime: RUNTIME_RANGE,
  score: SCORE_RANGE,
  country: "",
  language: "",
  certification: "",
};
