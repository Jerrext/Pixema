import React, { useEffect, useState } from "react";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getAllMovies,
  setMoviesList,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import Paginate from "src/components/Paginate";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { pageUrl } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const moviesList = useSelector(MovieSelectors.getMoviesList);
  const isAllMoviesLoadng = useSelector(MovieSelectors.getAllMoviesLoading);
  const pagesCount = useSelector(MovieSelectors.getPagesCount);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);

    navigate(`/home/page=${selected + 1}`);
  };

  useEffect(() => {
    if (pageUrl) {
      const page = +pageUrl.split("=")[1];
      dispatch(getAllMovies({ page }));
      setCurrentPage(page);
    }
    return () => {
      dispatch(setMoviesList([]));
    };
  }, [pageUrl]);

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
