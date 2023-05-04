import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import {
  CardListType,
  CardType,
  ModalWindowType,
} from "src/utils/@globalTypes";
import {
  ListPayload,
  GetAllMoviesPayload,
  MessagePayload,
  CreateListPayload,
  FullListsPayload,
} from "./@types";
import {
  GetListsResponseData,
  ListData,
  SingleMovieData,
  SingleMovieResponseData,
} from "../sagas/@types";

type MoviesState = {
  moviesList: CardListType;
  isAllMoviesLoading: boolean;
  pagesCount: number;
  isSingleMovieLoadng: boolean;
  singleMovie: SingleMovieData | null;
  recommendationMovieList: CardListType;
  isRecommendationMovieLoading: boolean;
  // favoriteMoviesList: CardListType;
  myMoviesLists: ListData[];
  fullMyMoviesLists: FullListsPayload[];
  isMyMoviesListLoadng: boolean;
  // modalWindow: Modal
  modalWindow: ModalWindowType | null;
};

const initialState: MoviesState = {
  moviesList: [],
  isAllMoviesLoading: false,
  pagesCount: 0,
  isSingleMovieLoadng: false,
  singleMovie: null,
  recommendationMovieList: [],
  isRecommendationMovieLoading: false,
  // favoriteMoviesList: [],
  myMoviesLists: [],
  fullMyMoviesLists: [],
  isMyMoviesListLoadng: false,
  modalWindow: null,
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
    getMyMoviesLists(_, __: PayloadAction<undefined>) {},
    setMyMoviesLists(state, action: PayloadAction<ListData[]>) {
      state.myMoviesLists = action.payload;
    },
    getFullMyMoviesLists(_, __: PayloadAction<number>) {},
    setFullMyMoviesLists(state, action: PayloadAction<FullListsPayload>) {
      state.fullMyMoviesLists.push(action.payload);
    },
    addMovieToList(_, __: PayloadAction<ListPayload>) {},
    setMyMoviesListLoading(state, action: PayloadAction<boolean>) {
      state.isMyMoviesListLoadng = action.payload;
    },
    changeMyMoviesLists(state, action: PayloadAction<FullListsPayload>) {
      const listIndex = state.fullMyMoviesLists.findIndex(
        (item) => item.id === action.payload.id
      );
      state.fullMyMoviesLists.splice(listIndex, 1, action.payload);
    },
    // setFavoriteMoviesList(state, action: PayloadAction<CardListType>) {
    //   state.favoriteMoviesList = action.payload;
    // },
    // getFavoriteMovies(_, __: PayloadAction<undefined>) {},
    removeListItem(_, __: PayloadAction<ListPayload>) {},
    createMyList(_, __: PayloadAction<CreateListPayload>) {},
    setModalWindow(state, action: PayloadAction<ModalWindowType | null>) {
      state.modalWindow = action.payload;
    },
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
  // setMyMoviesList,
  getMyMoviesLists,
  setMyMoviesLists,
  getFullMyMoviesLists,
  setFullMyMoviesLists,
  addMovieToList,
  changeMyMoviesLists,
  setMyMoviesListLoading,
  // getFavoriteMovies,
  // setFavoriteMoviesList,
  removeListItem,
  createMyList,
  setModalWindow,
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
  getFullMyMoviesLists: (state: RootState) => state.movie.fullMyMoviesLists,
  getMyMoviesLists: (state: RootState) => state.movie.myMoviesLists,
  getMyMoviesListLoading: (state: RootState) =>
    state.movie.isMyMoviesListLoadng,
  getModalWindow: (state: RootState) => state.movie.modalWindow,

  // getFavoriteMoviesList: (state: RootState) => state.movie.favoriteMoviesList,
};
