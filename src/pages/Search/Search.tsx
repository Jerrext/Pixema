import React, { useEffect } from "react";
import styles from "./Search.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getSearchList } from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import { useParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  const searchList = useSelector(MovieSelectors.getSearchMovieList);
  const isLoadng = useSelector(MovieSelectors.getAllMoviesLoading);

  const searchMovieList = searchList
    .filter((item) => item.model_type === "title" && item.popularity > 1)
    .sort((a, b) => b.popularity - a.popularity);

  useEffect(() => {
    query && dispatch(getSearchList(query));
  }, [query]);

  return isLoadng ? (
    <Loader />
  ) : (
    <>
      <p className={styles.searchValue}>{`Search results '${query}'`}</p>
      <CardList cardList={searchMovieList} />
    </>
  );
};

export default Search;
