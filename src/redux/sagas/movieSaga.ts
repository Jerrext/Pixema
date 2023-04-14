import React from "react";
import { all, put, takeLatest } from "redux-saga/effects";
import {
  getAllMovies,
  getRecommendationMovieList,
  getSingleMovie,
  setAllMoviesLoading,
  setMoviesList,
  setPagesCount,
  setRecommendationMovieList,
  setRecommendationMovieLoading,
  setSingleMovie,
  setSingleMovieLoading,
} from "../reducers/movieSlice";
import callCheckingAuth from "./callCheckingAuth";
import API from "../api";
import { ApiResponse } from "apisauce";
import {
  MoviesResponseData,
  RecommendationMoviesResponseData,
  SingleMovieResponseData,
} from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetAllMoviesPayload } from "../reducers/@types";
import { CardType } from "src/utils/@globalTypes";

function* getMoviesWorker(action: PayloadAction<GetAllMoviesPayload>) {
  yield put(setAllMoviesLoading(true));
  const { page } = action.payload;
  const { ok, data, problem }: ApiResponse<MoviesResponseData> =
    yield callCheckingAuth(API.getMovies, page);
  if (ok && data) {
    yield put(setMoviesList(data.pagination.data));
    yield put(setPagesCount(data.pagination.last_page));
  } else {
    console.warn("Error getting movies", problem);
  }
  yield put(setAllMoviesLoading(false));
}

function* getSingleMovieWorker(action: PayloadAction<string>) {
  yield put(setSingleMovieLoading(true));
  const id = action.payload;
  const { ok, data, problem }: ApiResponse<SingleMovieResponseData> =
    yield callCheckingAuth(API.getSingleMovieData, id);
  if (ok && data) {
    yield put(setSingleMovie(data.title));
  } else {
    console.warn("Error getting movie", problem);
  }
  yield put(setSingleMovieLoading(false));
}

function* getRecommendationMovieListWorker(action: PayloadAction<string>) {
  yield put(setRecommendationMovieLoading(true));
  const id = action.payload;
  const { ok, data, problem }: ApiResponse<RecommendationMoviesResponseData> =
    yield callCheckingAuth(API.getRecommendationMovieListData, id);
  if (ok && data) {
    yield put(setRecommendationMovieList(data.titles));
  } else {
    console.warn("Error getting movies", problem);
  }
  yield put(setRecommendationMovieLoading(false));
}

export default function* movieSaga() {
  yield all([
    takeLatest(getAllMovies, getMoviesWorker),
    takeLatest(getSingleMovie, getSingleMovieWorker),
    takeLatest(getRecommendationMovieList, getRecommendationMovieListWorker),
  ]);
}
