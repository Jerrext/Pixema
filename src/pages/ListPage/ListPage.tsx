import React, { useEffect } from "react";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  setMyMoviesListLoading,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";
import { useParams } from "react-router-dom";

const ListPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isMyMoviesListLoading = useSelector(
    MovieSelectors.getMyMoviesListLoading
  );
  const fullMoviesLists = useSelector(MovieSelectors.getFullMyMoviesLists);
  const moviesLists = useSelector(MovieSelectors.getMyMoviesLists);

  const getCurrentList = () => {
    if (fullMoviesLists && id) {
      const list = fullMoviesLists.find((item) => item.id === +id);
      return list ? list.list : [];
    }
    return [];
  };

  useEffect(() => {
    if (moviesLists.length === fullMoviesLists.length) {
      dispatch(setMyMoviesListLoading(false));
    }
  }, [fullMoviesLists, moviesLists]);

  return isMyMoviesListLoading ? (
    <Loader />
  ) : (
    <CardList cardList={getCurrentList()} />
  );
};

export default ListPage;
