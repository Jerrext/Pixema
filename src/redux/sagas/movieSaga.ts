import React from "react";
import { all, put, takeLatest } from "redux-saga/effects";
import {
  getAllMovies,
  setAllMoviesLoading,
  setMoviesList,
  setPagesCount,
} from "../reducers/movieSlice";
import callCheckingAuth from "./callCheckingAuth";
import API from "../api";
import { ApiResponse } from "apisauce";
import { MoviesResponseData } from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetAllMoviesPayload } from "../reducers/@types";

function* getMoviesWorker(action: PayloadAction<GetAllMoviesPayload>) {
  yield put(setAllMoviesLoading(true));
  const { page } = action.payload;
  const { ok, data, problem }: ApiResponse<MoviesResponseData> =
    yield callCheckingAuth(API.getMovies, page);
  if (ok && data) {
    yield put(setMoviesList(data.pagination.data));
    yield put(setPagesCount(data.pagination.last_page));
  } else {
    console.warn("Error sign up user", problem);
  }
  yield put(setAllMoviesLoading(false));
}

export default function* movieSaga() {
  yield all([takeLatest(getAllMovies, getMoviesWorker)]);
}
