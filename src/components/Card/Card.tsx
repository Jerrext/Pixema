import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardType, SearchCardType } from "src/utils/@globalTypes";
import { BookmarkIcon, EyeIcon, MovieIcon, TrendIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  addMovieToList,
  removeListItem,
} from "src/redux/reducers/movieSlice";
import { FullListsPayload } from "src/redux/reducers/@types";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type CardProps = {
  card: CardType | SearchCardType;
  classname?: string;
};

const Card: FC<CardProps> = ({ card, classname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useThemeContext();

  const [savedState, setSavedState] = useState(false);

  const moviesLists = useSelector(MovieSelectors.getFullMyMoviesLists);

  const { poster, rating, name, year, id, adult } = card;
  const favoriteList = moviesLists.find((item) => item.title === "Favorites");
  const favoriteIndex = favoriteList
    ? favoriteList.list.findIndex((movie) => movie.id === card.id)
    : -1;
  const watchedList = moviesLists.find((item) => item.title === "watchlist");
  const watchedIndex = watchedList
    ? watchedList.list.findIndex((movie) => movie.id === card.id)
    : -1;

  const isTrend = +rating >= 8;
  const isGreen = +rating < 8 && +rating >= 6;
  const isOrange = +rating < 6;

  const onBookmarkBtnClick = () => {
    if (favoriteList) {
      if (savedState) {
        dispatch(
          removeListItem({
            id: favoriteList.id,
            value: { itemId: id, itemType: "title" },
          })
        );
      } else {
        dispatch(
          addMovieToList({
            id: favoriteList.id,
            value: { itemId: id, itemType: "title" },
          })
        );
      }
    }
    setSavedState(!savedState);
  };

  const onTitleClick = () => {
    navigate(`/titles/${id}`);
  };

  useEffect(() => {
    setSavedState(favoriteIndex > -1);
  }, [favoriteIndex]);

  useEffect(() => {
    setSavedState(favoriteIndex > -1);
  }, [favoriteIndex]);

  return (
    <div className={classNames(styles.cardWrapper, classname)}>
      <div
        className={classNames(styles.posterWrapper, {
          [styles.posterWrapperLight]: theme === Theme.Light,
        })}
      >
        <MovieIcon />
        {adult ? (
          <div className={styles.censoredTitle}>Censored</div>
        ) : (
          <img src={poster} alt={name} />
        )}
      </div>
      <p
        className={classNames(styles.title, {
          [styles.censored]: adult,
        })}
        onClick={onTitleClick}
      >
        {adult ? "Censored Title" : `${name} (${year})`}
      </p>
      {rating && !adult && (
        <div
          className={classNames(styles.rating, {
            [styles.trendRating]: isTrend,
            [styles.greenRating]: isGreen,
            [styles.orangeRating]: isOrange,
          })}
        >
          {isTrend && <TrendIcon />}
          <div>{rating}</div>
        </div>
      )}
      <div
        className={classNames(styles.watched, {
          [styles.watchedMovie]: watchedIndex > -1,
        })}
      >
        <EyeIcon />
      </div>
      {!adult && (
        <div
          className={classNames(styles.bookmark, {
            [styles.addedMovie]: savedState,
          })}
          onClick={onBookmarkBtnClick}
        >
          <BookmarkIcon />
        </div>
      )}
    </div>
  );
};

export default Card;
