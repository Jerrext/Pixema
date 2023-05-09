import React, { FC, useState } from "react";
import styles from "./RatingComponent.module.scss";
import { Rating } from "react-simple-star-rating";
import classNames from "classnames";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { TrashCanIcon } from "src/assets/icons";

type RatingComponentProps = {
  title: string;
  rating: number;
  setRating: (value: React.SetStateAction<number>) => void;
};

const RatingComponent: FC<RatingComponentProps> = ({
  title,
  setRating,
  rating,
}) => {
  const { theme } = useThemeContext();

  const [moveRating, setMoveRating] = useState(1);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  // const onClearBtnClick = () => {
  //   setRating(0);
  //   setMoveRating(0);
  // };

  const onPointerMove = (value: number, index: number) => {
    setMoveRating(value);
  };

  const onPointerLeave = () => {
    setMoveRating(rating);
  };

  return (
    <div>
      <p>{title}</p>
      <div className={styles.rating}>
        <Rating
          onClick={handleRating}
          iconsCount={10}
          initialValue={rating}
          fillColor="#7b61ff"
          emptyColor="#afb2b6"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        />
        <div className={styles.scoreItem}>{moveRating}</div>
        {/* {rating !== 0 && (
          <div
            className={classNames(styles.scoreItem, styles.scoreBtn)}
            onClick={onClearBtnClick}
          >
            <TrashCanIcon />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default RatingComponent;
