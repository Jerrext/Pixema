import React, { useEffect, useMemo, useState } from "react";
import styles from "./Home.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import { MovieSelectors, getAllMovies } from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";
import ReactPaginate from "react-paginate";
import { ArrowIcon } from "src/assets/icons";
import classNames from "classnames";

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const moviesList = useSelector(MovieSelectors.getMoviesList);
  const isAllMoviesLoadng = useSelector(MovieSelectors.getAllMoviesLoading);
  const pagesCount = useSelector(MovieSelectors.getPagesCount);

  // const getPagesCount = () => {
  //   switch (activeTab) {
  //     case TabsNames.MyPosts:
  //       return pagesMyPostsCount;
  //     case TabsNames.All:
  //     default:
  //       return pagesCount;
  //   }
  // };

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    const page = currentPage;
    dispatch(getAllMovies({ page }));
  }, [currentPage]);

  return (
    <div className={styles.scrollWrapper}>
      {isAllMoviesLoadng ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <CardList cardList={moviesList} />
          <ReactPaginate
            nextLabel={<ArrowIcon />}
            previousLabel={<ArrowIcon />}
            pageCount={pagesCount}
            forcePage={currentPage - 1}
            onPageChange={onPageChange}
            containerClassName={styles.pagesContainer}
            pageClassName={styles.pageNumber}
            breakClassName={styles.pageNumber}
            breakLinkClassName={styles.linkPage}
            activeLinkClassName={classNames(styles.linkPage)}
            pageLinkClassName={classNames(styles.linkPage)}
            activeClassName={styles.activePageNumber}
            nextClassName={classNames(styles.arrowButton)}
            previousClassName={classNames(styles.arrowButton)}
            previousLinkClassName={classNames(styles.linkPage)}
            nextLinkClassName={classNames(styles.linkPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
