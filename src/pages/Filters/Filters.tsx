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
import { FILTERS_RESET } from "src/utils/constants";

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
      const filtersUrlData = filters.split("&").map((item) => item.split("="));

      const filtersData = Object.fromEntries(
        filtersUrlData.slice().map((item) => {
          if (item[0] === "genre") {
            return [item[0], item[1].split(",")];
          } else if (
            item[0] === "score" ||
            item[0] === "released" ||
            item[0] === "runtime"
          ) {
            const range = item[1].split(",");
            return [item[0], { max: +range[1], min: +range[0] }];
          } else {
            return item;
          }
        })
      );

      const newFilterData: any = Object.assign({}, FILTERS_RESET);

      Object.keys(filtersData).forEach((key) => {
        newFilterData[key] = filtersData[key];
      });

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
      } = Object.fromEntries(filtersUrlData);

      setCurrentPage(page);

      dispatch(setFiltersData(newFilterData));
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
      dispatch(setFiltersData(FILTERS_RESET));
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
