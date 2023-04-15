import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./SingleMovie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getRecommendationMovieList,
  getSingleMovie,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import { useParams } from "react-router-dom";
import GroupButtons from "src/components/GroupButtons";
import classNames from "classnames";
import { EyeIcon, ImdbIcon, TrendIcon } from "src/assets/icons";
import {
  getMoneyFormat,
  getUkFormatDate,
  getWordWithCapitalLetter,
} from "src/utils/functions";
import Arrow from "src/components/Arrow";
import Card from "src/components/Card";
import Player from "src/components/Player";

const SingleMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const isSingleMovieLoadng = useSelector(MovieSelectors.getSingleMovieLoadng);
  const movieData = useSelector(MovieSelectors.getSingleMovie);
  const recommendationCardList = useSelector(
    MovieSelectors.getRecommendationMovieList
  );
  const isRecommendationMovieLoading = useSelector(
    MovieSelectors.getRecommendationMovieLoading
  );

  const recommendationPageCount = Math.ceil(recommendationCardList.length / 4);
  const isTrend = movieData?.rating && +movieData.rating >= 8;
  const isGreen =
    movieData?.rating && +movieData.rating < 8 && +movieData.rating >= 6;
  const isOrange = movieData?.rating && +movieData.rating < 6;
  const emptyValue = "Empty";

  const getCreditsDepartment = (department: string) => {
    const data = movieData?.credits.filter(
      (item) => item.pivot.department === department
    );
    return data?.length !== 0
      ? data?.map((item) => item.name).join(", ")
      : emptyValue;
  };

  const movieDataList = [
    {
      title: "Year",
      description: movieData?.year ? movieData.year : emptyValue,
    },
    {
      title: "Released",
      description: movieData?.release_date
        ? getUkFormatDate(movieData.release_date)
        : emptyValue,
    },
    {
      title: "Revenue",
      description: movieData?.revenue
        ? getMoneyFormat(movieData?.revenue)
        : emptyValue,
    },
    {
      title: "Budget",
      description: movieData?.budget
        ? getMoneyFormat(movieData?.budget)
        : emptyValue,
    },
    {
      title: "Type",
      description: movieData?.type
        ? getWordWithCapitalLetter(movieData.type)
        : emptyValue,
    },
    {
      title: "Actors",
      description: getCreditsDepartment("cast"),
    },
    {
      title: "Director",
      description: getCreditsDepartment("directing"),
    },
    {
      title: "Writers",
      description: getCreditsDepartment("writing"),
    },
  ];

  const nextPageOnClick = () => {
    currentPage < recommendationPageCount && setCurrentPage(currentPage + 1);
  };

  const previosPageOnClick = () => {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  };

  const recommendationPageList = useMemo(() => {
    return recommendationCardList.filter(
      (item, index) => index >= 4 * (currentPage - 1) && index < 4 * currentPage
    );
  }, [recommendationCardList, currentPage]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleMovie(id));
      dispatch(getRecommendationMovieList(id));
    }
  }, [id]);

  return isSingleMovieLoadng ? (
    <Loader />
  ) : (
    <div className={styles.scrollWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.movieCardWrapper}>
          <div className={styles.movieCard}>
            <img src={movieData?.poster} className={styles.moviePoster}></img>
            <GroupButtons />
          </div>
        </div>
        <div className={styles.movieText}>
          <div className={styles.titleWrapper}>
            <div className={styles.genres}>
              {movieData?.genres.map((item) => {
                return <div key={item.id}>{item.display_name}</div>;
              })}
            </div>
            <h1 className={styles.title}>{movieData?.name}</h1>
          </div>
          <div className={styles.description}>
            <div className={styles.raringWrapper}>
              <div
                className={classNames(styles.rating, {
                  [styles.trendRating]: isTrend,
                  [styles.greenRating]: isGreen,
                  [styles.orangeRating]: isOrange,
                })}
              >
                {isTrend && <TrendIcon />}
                {movieData?.rating ? movieData.rating : 0}
              </div>
              <div>
                <ImdbIcon />
                <p>{movieData?.rating ? movieData.rating : 0}</p>
              </div>
              {movieData?.runtime && <div>{movieData?.runtime} min</div>}
              <div>
                <EyeIcon />
                <p>{movieData?.views ? movieData.views : 0}</p>
              </div>
            </div>
            {movieData?.description && <p>{movieData?.description}</p>}
            <div className={styles.movieData}>
              <table className={styles.table}>
                <tbody>
                  {movieDataList.map((item, index) => {
                    return (
                      <tr key={item.title + index}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {movieData && (
            <div className={styles.playerWrapper}>
              <Player
                title={movieData?.original_title}
                year={movieData?.year}
              />
            </div>
          )}
          {/* <iframe
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/GLzthfaWJkM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe> */}
          <div className={styles.recommendation}>
            <div className={styles.recommendationTop}>
              <h2>Recommendation</h2>
              <div className={styles.buttonsWrapper}>
                <Arrow
                  onClick={previosPageOnClick}
                  disabled={currentPage === 1}
                />
                <Arrow
                  onClick={nextPageOnClick}
                  disabled={currentPage === recommendationPageCount}
                />
              </div>
            </div>
            {isRecommendationMovieLoading ? (
              <Loader />
            ) : (
              <div className={styles.recommendationCardList}>
                {recommendationPageList.map((item) => {
                  return (
                    <Card key={item.id} card={item} classname={styles.card} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
