import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import { CardListType } from "src/utils/@globalTypes";
import { GetAllMoviesPayload } from "./@types";

type MoviesState = {
  moviesList: CardListType;
  isAllMoviesLoading: boolean;
  pagesCount: number;
};

const initialState: MoviesState = {
  moviesList: [],
  isAllMoviesLoading: false,
  pagesCount: 0,
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
  },
});

export const {
  getAllMovies,
  setMoviesList,
  setAllMoviesLoading,
  setPagesCount,
} = MovieSlice.actions;
export default MovieSlice.reducer;

export const movieName = MovieSlice.name;

export const MovieSelectors = {
  getMoviesList: (state: RootState) => state.movie.moviesList,
  getAllMoviesLoading: (state: RootState) => state.movie.isAllMoviesLoading,
  getPagesCount: (state: RootState) => state.movie.pagesCount,
};
