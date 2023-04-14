import React from "react";
import { all, put, takeLatest } from "redux-saga/effects";
import { getAllMovies, setMoviesList } from "../reducers/movieSlice";
import callCheckingAuth from "./callCheckingAuth";
import API from "../api";
import { ApiResponse } from "apisauce";
import { MoviesResponseData } from "./@types";

function* getMoviesWorker() {
  const { ok, data, problem }: ApiResponse<MoviesResponseData> =
    yield callCheckingAuth(API.getMovies);
  if (ok && data) {
    yield put(setMoviesList(data.pagination.data));
  } else {
    console.warn("Error sign up user", problem);
  }
}

export default function* movieSaga() {
  yield all([takeLatest(getAllMovies, getMoviesWorker)]);
}
