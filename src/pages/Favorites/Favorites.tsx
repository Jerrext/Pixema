import React, { useEffect, useMemo, useState } from "react";
import styles from "./Favorites.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getFavoriteMovies,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";
import Paginate from "src/components/Paginate/Paginate";

const Favorites = () => {
  const dispatch = useDispatch();

  const isMyMoviesListLoading = useSelector(
    MovieSelectors.getMyMoviesListLoading
  );
  const favoriteMoviesList = useSelector(MovieSelectors.getFavoriteMoviesList);

  useEffect(() => {
    dispatch(getFavoriteMovies());
  }, []);

  return isMyMoviesListLoading ? (
    <Loader />
  ) : (
    <CardList cardList={favoriteMoviesList} />
  );
};

export default Favorites;
