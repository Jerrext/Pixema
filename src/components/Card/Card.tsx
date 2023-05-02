import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardType } from "src/utils/@globalTypes";
import { BookmarkIcon, TrendIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  addMovieToList,
  removeListItem,
} from "src/redux/reducers/movieSlice";

type CardProps = {
  card: CardType;
  classname?: string;
};

const Card: FC<CardProps> = ({ card, classname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [savedState, setSavedState] = useState(false);

  const moviesLists = useSelector(MovieSelectors.getFullMyMoviesLists);

  const { poster, rating, name, year, id } = card;
  const favoriteList = moviesLists.find((item) => item.title === "Favorites");
  const favoriteIndex = favoriteList?.list.findIndex(
    (movie) => movie.id === id
  );

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
      setSavedState(!savedState);
    }
  };

  const onTitleClick = () => {
    navigate(`/titles/${id}`);
  };

  useEffect(() => {
    favoriteIndex && setSavedState(favoriteIndex > -1);
  }, [favoriteIndex]);

  return (
    <div className={classNames(styles.cardWrapper, classname)}>
      <div className={styles.posterWrapper}>
        <img src={poster} alt={name} />
      </div>
      <p
        className={styles.title}
        onClick={onTitleClick}
      >{`${name} (${year})`}</p>
      <div
        className={classNames(styles.rating, {
          [styles.trendRating]: isTrend,
          [styles.greenRating]: isGreen,
          [styles.orangeRating]: isOrange,
        })}
      >
        {isTrend && <TrendIcon />}
        <div>{rating ? rating : 0}</div>
      </div>
      <div
        className={classNames(styles.bookmark, {
          [styles.addedMovie]: savedState,
        })}
        onClick={onBookmarkBtnClick}
      >
        <BookmarkIcon />
      </div>
    </div>
  );
};

export default Card;
