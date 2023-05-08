import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import {
  CardListType,
  CardType,
  FiltersType,
  ModalWindowType,
  SearchListType,
} from "src/utils/@globalTypes";
import {
  ListPayload,
  CreateListPayload,
  FullListsPayload,
  RemoveListPayload,
  GetAllMoviesPayload,
  FiltersPayload,
} from "./@types";
import { ListData, SingleMovieData } from "../sagas/@types";
import { FILTERS_RESET } from "src/utils/constants";

type MoviesState = {
  moviesList: CardListType;
  isAllMoviesLoading: boolean;
  pagesCount: number;
  isSingleMovieLoadng: boolean;
  singleMovie: SingleMovieData | null;
  recommendationMovieList: CardListType;
  isRecommendationMovieLoading: boolean;
  myMoviesLists: ListData[];
  fullMyMoviesLists: FullListsPayload[];
  isMyMoviesListLoadng: boolean;
  modalWindow: ModalWindowType | null;
  currentList: ListData | null;
  searchList: SearchListType;
  filtersData: FiltersType;
};

const initialState: MoviesState = {
  moviesList: [],
  isAllMoviesLoading: false,
  pagesCount: 0,
  isSingleMovieLoadng: false,
  singleMovie: null,
  recommendationMovieList: [],
  isRecommendationMovieLoading: false,
  myMoviesLists: [],
  fullMyMoviesLists: [],
  isMyMoviesListLoadng: false,
  modalWindow: null,
  currentList: null,
  searchList: [],
  filtersData: FILTERS_RESET,
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
      state.myMoviesLists = action.payload.sort((a, b) => a.id - b.id);
    },
    getFullMyMoviesLists(_, __: PayloadAction<number>) {},
    setFullMyMoviesLists(state, action: PayloadAction<FullListsPayload>) {
      state.fullMyMoviesLists.push(action.payload);
      state.fullMyMoviesLists.sort((a, b) => a.id - b.id);
    },
    clearFullMyMoviesLists(state, __: PayloadAction<undefined>) {
      state.fullMyMoviesLists = [];
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
    removeListItem(_, __: PayloadAction<ListPayload>) {},
    createMyList(_, __: PayloadAction<CreateListPayload>) {},
    setModalWindow(state, action: PayloadAction<ModalWindowType | null>) {
      state.modalWindow = action.payload;
    },
    setCurrentList(state, action: PayloadAction<ListData | null>) {
      state.currentList = action.payload;
    },
    removeList(_, __: PayloadAction<RemoveListPayload>) {},
    clearMoviesData(state, __: PayloadAction<undefined>) {
      state.currentList = null;
      state.moviesList = [];
      state.pagesCount = 0;
      state.singleMovie = null;
      state.recommendationMovieList = [];
      state.myMoviesLists = [];
      state.fullMyMoviesLists = [];
    },
    getSearchList(_, __: PayloadAction<string>) {},
    setSearchList(state, action: PayloadAction<SearchListType>) {
      state.searchList = action.payload;
    },
    setFiltersData(state, action: PayloadAction<FiltersType>) {
      state.filtersData = action.payload;
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
  getMyMoviesLists,
  setMyMoviesLists,
  getFullMyMoviesLists,
  setFullMyMoviesLists,
  addMovieToList,
  changeMyMoviesLists,
  setMyMoviesListLoading,
  removeListItem,
  createMyList,
  setModalWindow,
  setCurrentList,
  removeList,
  clearFullMyMoviesLists,
  clearMoviesData,
  getSearchList,
  setSearchList,
  setFiltersData,
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
  getCurrentList: (state: RootState) => state.movie.currentList,
  getSearchMovieList: (state: RootState) => state.movie.searchList,
  getFilters: (state: RootState) => state.movie.filtersData,
};
