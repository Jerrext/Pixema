import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardType } from "src/utils/@globalTypes";
import { BookmarkIcon, TrendIcon } from "src/assets/icons";

type CardProps = {
  card: CardType;
  bookmark?: boolean;
};

const Card: FC<CardProps> = ({ card, bookmark }) => {
  const { poster, rating, name, year } = card;

  const isTrend = +rating >= 8;
  const isGreen = +rating < 8 && +rating >= 6;
  const isOrange = +rating < 6;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.posterWrapper}>
        <img src={poster} alt={name} />
      </div>
      <p className={styles.title}>{`${name} (${year})`}</p>
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
