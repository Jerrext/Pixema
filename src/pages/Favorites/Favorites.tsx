import React, { useEffect, useMemo, useState } from "react";
import styles from "./Favorites.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  // getFavoriteMovies,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";

const Favorites = () => {
  const isMyMoviesListLoading = useSelector(
    MovieSelectors.getMyMoviesListLoading
  );
  // const favoriteMoviesList = useSelector(MovieSelectors.getFavoriteMoviesList);

  return isMyMoviesListLoading ? <Loader /> : <CardList cardList={[]} />;
};

export default Favorites;
