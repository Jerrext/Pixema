import React from "react";
import { all, put, takeLatest } from "redux-saga/effects";
import {
  addMovieToList,
  getAllMovies,
  getFavoriteMovies,
  getMyMoviesList,
  getRecommendationMovieList,
  getSingleMovie,
  removeListItem,
  setAllMoviesLoading,
  setFavoriteMoviesList,
  setMoviesList,
  setMyMoviesList,
  setMyMoviesListLoading,
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
  ChangeListResponseData,
  MoviesResponseData,
  MyListResponseData,
  RecommendationMoviesResponseData,
  SingleMovieResponseData,
} from "./@types";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListPayload, GetAllMoviesPayload } from "../reducers/@types";
import { CardType } from "src/utils/@globalTypes";
import { setMessage } from "../reducers/messageSlice";

function* getMoviesWorker(action: PayloadAction<GetAllMoviesPayload>) {
  yield put(setAllMoviesLoading(true));
  const { page } = action.payload;
  const { ok, data, problem }: ApiResponse<MoviesResponseData> =
    yield callCheckingAuth(API.getMovies, page);
  if (ok && data) {
    yield put(setMoviesList(data.pagination.data));
    yield put(setPagesCount(data.pagination.last_page));
    yield put(setAllMoviesLoading(false));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error getting movies list ${problem}`,
      })
    );
  }
}

function* getSingleMovieWorker(action: PayloadAction<string>) {
  yield put(setSingleMovieLoading(true));
  const id = action.payload;
  const { ok, data, problem }: ApiResponse<SingleMovieResponseData> =
    yield callCheckingAuth(API.getSingleMovieData, id);
  if (ok && data) {
    yield put(setSingleMovie(data.title));
    yield put(setSingleMovieLoading(false));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error getting movie data ${problem}`,
      })
    );
  }
}

function* getRecommendationMovieListWorker(action: PayloadAction<string>) {
  yield put(setRecommendationMovieLoading(true));
  const id = action.payload;
  const { ok, data, problem }: ApiResponse<RecommendationMoviesResponseData> =
    yield callCheckingAuth(API.getRecommendationMovieListData, id);
  if (ok && data) {
    yield put(setRecommendationMovieList(data.titles));
    yield put(setRecommendationMovieLoading(false));
  } else {
    console.warn("Error getting recommendation movies", problem);
  }
}

function* getMyMoviesListWorker(action: PayloadAction<number>) {
  yield put(setMyMoviesListLoading(true));
  const id = action.payload;
  const { ok, data, problem }: ApiResponse<MyListResponseData> =
    yield callCheckingAuth(API.getMyList, id);
  if (ok && data) {
    yield put(setMyMoviesList(data.items.data));
    yield put(setMyMoviesListLoading(false));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error getting movies list ${problem}`,
      })
    );
  }
}

function* addMovieToListWorker(action: PayloadAction<ListPayload>) {
  const { id, value } = action.payload;
  const { ok, data, problem }: ApiResponse<ChangeListResponseData> =
    yield callCheckingAuth(API.addToList, id, value);
  if (ok && data) {
    yield put(setFavoriteMoviesList(data.list.items));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error add movie to list ${problem}`,
      })
    );
  }
}

function* getFavoriteMoviesListWorker() {
  yield put(setMyMoviesListLoading(true));
  const { ok, data, problem }: ApiResponse<MyListResponseData> =
    yield callCheckingAuth(API.getMyList, 376);
  if (ok && data) {
    yield put(setFavoriteMoviesList(data.items.data));
    yield put(setMyMoviesListLoading(false));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error getting favorite list ${problem}`,
      })
    );
  }
}

function* removeListItemWorker(action: PayloadAction<ListPayload>) {
  const { id, value } = action.payload;
  const { ok, data, problem }: ApiResponse<ChangeListResponseData> =
    yield callCheckingAuth(API.removeListItem, id, value);
  if (ok && data) {
    yield put(setFavoriteMoviesList(data.list.items));
  } else {
    yield put(
      setMessage({
        status: false,
        message: `Error remove movie from list ${problem}`,
      })
    );
  }
}

export default function* movieSaga() {
  yield all([
    takeLatest(getAllMovies, getMoviesWorker),
    takeLatest(getSingleMovie, getSingleMovieWorker),
    takeLatest(getRecommendationMovieList, getRecommendationMovieListWorker),
    takeLatest(getMyMoviesList, getMyMoviesListWorker),
    takeLatest(addMovieToList, addMovieToListWorker),
    takeLatest(getFavoriteMovies, getFavoriteMoviesListWorker),
    takeLatest(removeListItem, removeListItemWorker),
  ]);
}
