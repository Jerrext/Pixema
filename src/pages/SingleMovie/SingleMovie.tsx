import React, { useEffect, useMemo, useState } from "react";
import styles from "./SingleMovie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  getRecommendationMovieList,
  getSingleMovie,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader/Loader";
import { useParams } from "react-router-dom";
import GroupButtons from "src/components/GroupButtons/GroupButtons";
import classNames from "classnames";
import { EyeIcon, ImdbIcon, TrendIcon } from "src/assets/icons";
import { getMoneyFormat, getWordWithCapitalLetter } from "src/utils/functions";
import Arrow from "src/components/Arrow/Arrow";

const SingleMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isSingleMovieLoadng = useSelector(MovieSelectors.getSingleMovieLoadng);
  const movieData = useSelector(MovieSelectors.getSingleMovie);
  const recommendationCardList = useSelector(
    MovieSelectors.getRecommendationMovieList
  );

  const movieDataList = [
    {
      title: "Year",
      description: movieData?.year,
    },
    {
      title: "Released",
      description: movieData?.release_date,
    },
    {
      title: "Revenue",
      description: movieData?.revenue && getMoneyFormat(movieData?.revenue),
    },
    {
      title: "Budget",
      description: movieData?.budget && getMoneyFormat(movieData?.budget),
    },
    {
      title: "Type",
      description: movieData?.type && getWordWithCapitalLetter(movieData.type),
    },
    {
      title: "Actors",
      description: movieData?.credits
        .filter((item) => item.pivot.department === "cast")
        .map((item) => item.name)
        .join(", "),
    },
    {
      title: "Director",
      description: movieData?.credits
        .filter((item) => item.pivot.department === "directing")
        .map((item) => item.name)
        .join(", "),
    },
    {
      title: "Writers",
      description: movieData?.credits
        .filter((item) => item.pivot.department === "writing")
        .map((item) => item.name)
        .join(", "),
    },
  ];

  const isTrend = movieData?.rating && +movieData.rating >= 8;
  const isGreen =
    movieData?.rating && +movieData.rating < 8 && +movieData.rating >= 6;
  const isOrange = movieData?.rating && +movieData.rating < 6;

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
              <div>{movieData?.runtime} min</div>
              <div>
                <EyeIcon />
                <p>{movieData?.views ? movieData.views : 0}</p>
              </div>
            </div>
            <p>{movieData?.description}</p>
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
          <div className={styles.recommendation}>
            <div className={styles.recommendationTop}>
              <h2>Recommendation</h2>
              <div className={styles.buttonsWrapper}>
                <Arrow onClick={() => {}} />
                <Arrow onClick={() => {}} />
              </div>
            </div>
          </div>
          {recommendationCardList ? (
            <Loader />
          ) : (
            <div className={styles.recommendationCardList}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
