import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import { CardListType, CardType } from "src/utils/@globalTypes";
import { ListPayload, GetAllMoviesPayload, MessagePayload } from "./@types";
import { SingleMovieData, SingleMovieResponseData } from "../sagas/@types";

type MoviesState = {
  moviesList: CardListType;
  isAllMoviesLoading: boolean;
  pagesCount: number;
  isSingleMovieLoadng: boolean;
  singleMovie: SingleMovieData | null;
  recommendationMovieList: CardListType;
  isRecommendationMovieLoading: boolean;
  favoriteMoviesList: CardListType;
  myMoviesList: CardListType;
  isMyMoviesListLoadng: boolean;
};

const initialState: MoviesState = {
  moviesList: [],
  isAllMoviesLoading: false,
  pagesCount: 0,
  isSingleMovieLoadng: false,
  singleMovie: null,
  recommendationMovieList: [],
  isRecommendationMovieLoading: false,
  favoriteMoviesList: [],
  myMoviesList: [],
  isMyMoviesListLoadng: false,
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getAllMovies(_, __: PayloadAction<GetAllMoviesPayload>) {},
    setMoviesList(state, action: PayloadAction<CardListType>) {
      state.moviesList = action.payload;
    },
    setAllMoviesLoading(state, action: PayloadAction<boolean>) {
      state.isAllMoviesLoading = action.payload;
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;
    },
    setSingleMovieLoading(state, action: PayloadAction<boolean>) {
      state.isSingleMovieLoadng = action.payload;
    },
    getSingleMovie(_, __: PayloadAction<string>) {},
    setSingleMovie(state, action: PayloadAction<SingleMovieData | null>) {
      state.singleMovie = action.payload;
    },
    getRecommendationMovieList(_, __: PayloadAction<string>) {},
    setRecommendationMovieList(state, action: PayloadAction<CardListType>) {
      state.recommendationMovieList = action.payload;
    },
    setRecommendationMovieLoading(state, action: PayloadAction<boolean>) {
      state.isRecommendationMovieLoading = action.payload;
    },
    getMyMoviesList(_, __: PayloadAction<number>) {},
    setMyMoviesList(state, action: PayloadAction<CardListType>) {
      state.myMoviesList = action.payload;
    },
    addMovieToList(_, __: PayloadAction<ListPayload>) {},
    setMyMoviesListLoading(state, action: PayloadAction<boolean>) {
      state.isMyMoviesListLoadng = action.payload;
    },
    setFavoriteMoviesList(state, action: PayloadAction<CardListType>) {
      state.favoriteMoviesList = action.payload;
    },
    getFavoriteMovies(_, __: PayloadAction<undefined>) {},
    removeListItem(_, __: PayloadAction<ListPayload>) {},
  },
});

export const {
  getAllMovies,
  setMoviesList,
  setAllMoviesLoading,
  setPagesCount,
  setSingleMovieLoading,
  getSingleMovie,
  setSingleMovie,
  getRecommendationMovieList,
  setRecommendationMovieList,
  setRecommendationMovieLoading,
  setMyMoviesList,
  getMyMoviesList,
  addMovieToList,
  setMyMoviesListLoading,
  getFavoriteMovies,
  setFavoriteMoviesList,
  removeListItem,
} = MovieSlice.actions;
export default MovieSlice.reducer;

export const movieName = MovieSlice.name;

export const MovieSelectors = {
  getMoviesList: (state: RootState) => state.movie.moviesList,
  getAllMoviesLoading: (state: RootState) => state.movie.isAllMoviesLoading,
  getPagesCount: (state: RootState) => state.movie.pagesCount,
  getSingleMovieLoadng: (state: RootState) => state.movie.isSingleMovieLoadng,
  getSingleMovie: (state: RootState) => state.movie.singleMovie,
  getRecommendationMovieList: (state: RootState) =>
    state.movie.recommendationMovieList,
  getRecommendationMovieLoading: (state: RootState) =>
    state.movie.isRecommendationMovieLoading,
  getMyMoviesList: (state: RootState) => state.movie.myMoviesList,
  getMyMoviesListLoading: (state: RootState) =>
    state.movie.isMyMoviesListLoadng,
  getFavoriteMoviesList: (state: RootState) => state.movie.favoriteMoviesList,
};
