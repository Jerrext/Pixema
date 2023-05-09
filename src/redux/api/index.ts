import { create } from "apisauce";
import {
  AddReviewPayload,
  DetailsListType,
  ListValue,
  SigInPayloadData,
  SigUpPayloadData,
} from "../reducers/@types";
import { PER_PAGE } from "src/utils/constants";

const API = create({
  baseURL: "https://unelmamovie.com/api/v1",
});

const signUpUser = (data: SigUpPayloadData) => {
  return API.post("/auth/register", data);
};

const signInUser = (data: SigInPayloadData) => {
  return API.post("/auth/login", data);
};

const getUserData = (token: string, id: number | string) => {
  return API.get(
    `/user-profile/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getMovies = (
  token: string,
  page: number,
  order?: string,
  type?: string,
  genre?: string,
  released?: string,
  runtime?: string,
  score?: string,
  language?: string,
  certification?: string,
  country?: string,
  include_adult?: boolean
) => {
  return API.get(
    `/titles`,
    {
      perPage: PER_PAGE,
      page,
      order,
      type,
      genre,
      released,
      runtime,
      score,
      language,
      certification,
      country,
      include_adult,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getSingleMovieData = (token: string, id: string) => {
  return API.get(
    `/titles/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getRecommendationMovieListData = (token: string, id: string) => {
  return API.get(
    `/titles/${id}/related`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createMyList = (token: string, data: DetailsListType) => {
  return API.post("/lists", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editMyList = (token: string, id: number, data: DetailsListType) => {
  return API.put(`/lists/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getMyList = (token: string, id: string) => {
  return API.get(
    `/lists/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getMyLists = (token: string, id: string | number) => {
  return API.get(
    `/user-profile/${id}/lists`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const addToList = (token: string, id: number, value: ListValue) => {
  return API.post(`/lists/${id}/add`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeListItem = (token: string, id: number, value: ListValue) => {
  return API.post(`/lists/${id}/remove`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const removeList = (token: string, id: number) => {
  return API.delete(
    `/lists/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getSearchList = (token: string, query: string) => {
  return API.get(
    `/search/${query}`,
    { limit: 100 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createReview = (token: string, data: AddReviewPayload) => {
  return API.post(`/reviews`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getRating = (token: string, id: string | number) => {
  return API.get(
    `/user-profile/${id}/ratings`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  signUpUser,
  signInUser,
  getUserData,
  getMovies,
  getSingleMovieData,
  getRecommendationMovieListData,
  getMyList,
  getMyLists,
  addToList,
  removeListItem,
  createMyList,
  removeList,
  getSearchList,
  editMyList,
  createReview,
  getRating,
};
