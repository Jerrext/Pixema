import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";

type MoviesState = {
  moviesList: any;
};

const initialState: MoviesState = {
  moviesList: [],
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getAllMovies(_, __: PayloadAction<undefined>) {},
    setMoviesList(state, action: PayloadAction<any>) {
      state.moviesList = action.payload;
    },
  },
});

export const { getAllMovies, setMoviesList } = MovieSlice.actions;
export default MovieSlice.reducer;

export const movieName = MovieSlice.name;

export const MovieSelectors = {
  getMoviesList: (state: RootState) => state.movie.moviesList,
};
