import { create } from "apisauce";
import {
  AddToListPayload,
  AddToListValue,
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

const getMovies = (token: string, page: number) => {
  return API.get(
    `/titles`,
    { perPage: PER_PAGE, page },
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

const addToList = (token: string, id: number, value: AddToListValue) => {
  return API.post(`/lists/${id}/add`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  signUpUser,
  signInUser,
  getUserData,
  getMovies,
  getSingleMovieData,
  getRecommendationMovieListData,
  getMyList,
  addToList,
};
