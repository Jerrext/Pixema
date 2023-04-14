import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import { CardListType } from "src/utils/@globalTypes";

type MoviesState = {
  moviesList: CardListType;
  isAllMoviesLoading: boolean;
};

const initialState: MoviesState = {
  moviesList: [],
  isAllMoviesLoading: false,
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getAllMovies(_, __: PayloadAction<undefined>) {},
    setMoviesList(state, action: PayloadAction<any>) {
      state.moviesList = action.payload;
    },
    setAllMoviesLoading(state, action: PayloadAction<boolean>) {
      state.isAllMoviesLoading = action.payload;
    },
  },
});

export const { getAllMovies, setMoviesList, setAllMoviesLoading } =
  MovieSlice.actions;
export default MovieSlice.reducer;

export const movieName = MovieSlice.name;

export const MovieSelectors = {
  getMoviesList: (state: RootState) => state.movie.moviesList,
  getAllMoviesLoading: (state: RootState) => state.movie.isAllMoviesLoading,
};
