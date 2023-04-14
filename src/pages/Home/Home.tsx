import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const moviesList = useSelector(MovieSelectors.getMoviesList);
  const isAllMoviesLoadng = useSelector(MovieSelectors.getAllMoviesLoading);

  const onShowMoreBtnClick = () => {};

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  return (
    <div className={styles.scrollWrapper}>
      {isAllMoviesLoadng ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <CardList cardList={moviesList} />
          <div className={styles.showMoreBtn} onClick={onShowMoreBtnClick}>
            Show more
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
