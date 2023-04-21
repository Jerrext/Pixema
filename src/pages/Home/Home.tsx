import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { ArrowIcon } from "src/assets/icons";
import classNames from "classnames";
import Paginate from "src/components/Paginate/Paginate";

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const moviesList = useSelector(MovieSelectors.getMoviesList);
  const isAllMoviesLoadng = useSelector(MovieSelectors.getAllMoviesLoading);
  const pagesCount = useSelector(MovieSelectors.getPagesCount);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    const page = currentPage;
    dispatch(getAllMovies({ page }));
  }, [currentPage]);

  return isAllMoviesLoadng ? (
    <Loader />
  ) : (
    <>
      <CardList cardList={moviesList} />
      {moviesList.length > 0 && (
        <Paginate
          pageCount={pagesCount}
          forcePage={currentPage - 1}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Home;
