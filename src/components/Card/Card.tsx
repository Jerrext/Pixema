import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardType } from "src/utils/@globalTypes";
import { BookmarkIcon, TrendIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";

type CardProps = {
  card: CardType;
  bookmark?: boolean;
  classname?: string;
};

const Card: FC<CardProps> = ({ card, bookmark, classname }) => {
  const navigate = useNavigate();

  const { poster, rating, name, year, id } = card;

  const isTrend = +rating >= 8;
  const isGreen = +rating < 8 && +rating >= 6;
  const isOrange = +rating < 6;

  const onTitleClick = () => {
    navigate(`/titles/${id}`);
  };

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
          [styles.addedMovie]: bookmark,
        })}
      >
        <BookmarkIcon />
      </div>
    </div>
  );
};

export default Card;
