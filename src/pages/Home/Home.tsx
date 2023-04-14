import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "src/redux/reducers/movieSlice";

const Home = () => {
  const dispatch = useDispatch();

  const moviesList = useSelector(MovieSelectors.getMoviesList);

  const onShowMoreBtnClick = () => {};

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  return (
    <div className={styles.wrapper}>
      <CardList cardList={moviesList} />
      <div className={styles.showMoreBtn} onClick={onShowMoreBtnClick}>
        Show more
      </div>
    </div>
  );
};

export default Home;
