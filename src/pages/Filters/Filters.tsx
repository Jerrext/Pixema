import React, { useEffect, useState } from "react";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getAllMovies,
  setFiltersData,
  setMoviesList,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import Paginate from "src/components/Paginate";
import { useNavigate, useParams } from "react-router-dom";

const Filters = () => {
  const { filters } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const moviesList = useSelector(MovieSelectors.getMoviesList);
  const isAllMoviesLoadng = useSelector(MovieSelectors.getAllMoviesLoading);
  const pagesCount = useSelector(MovieSelectors.getPagesCount);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);

    if (filters) {
      const filtersArr = filters.split("&");
      filtersArr.splice(filtersArr.length - 1, 1, `page=${selected + 1}`);
      const newFiltersUrl = filtersArr.join("&");
      navigate(`/filters/${newFiltersUrl}`);
    }
  };

  useEffect(() => {
    if (filters) {
      const filtersUrlData = Object.fromEntries(
        filters.split("&").map((item) => item.split("="))
      );
      const {
        page,
        order,
        type,
        genre,
        released,
        runtime,
        score,
        language,
        certification,
        country,
      } = filtersUrlData;

      setCurrentPage(page);

      dispatch(setFiltersData(filtersUrlData));
      dispatch(
        getAllMovies({
          page,
          order,
          type,
          genre,
          released,
          runtime,
          score,
          language,
          certification,
          country,
        })
      );
    }

    return () => {
      dispatch(setMoviesList([]));
    };
  }, [filters]);

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

export default Filters;
