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

  const isTrend = +rating > 8;
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.posterWrapper}>
        <img src={poster} alt={name} />
      </div>
      <p className={styles.title}>{`${name} (${year})`}</p>
      <div
        className={classNames(styles.rating, {
          [styles.trendRating]: isTrend,
        })}
      >
        {isTrend && <TrendIcon />}
        <div>{rating}</div>
      </div>
      {bookmark && (
        <div className={styles.bookmark}>
          <BookmarkIcon />
        </div>
      )}
    </div>
  );
};

export default Card;
