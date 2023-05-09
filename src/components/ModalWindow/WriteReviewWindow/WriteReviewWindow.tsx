import React, { FC, useEffect, useState } from "react";
import styles from "./WriteReviewWindow.module.scss";
import { useDispatch } from "react-redux";
import { ButtonType } from "src/utils/@globalTypes";
import Button from "src/components/Button";
import ModalWindow from "../ModalWindow";
import RatingComponent from "src/components/RatingComponent";
import Input from "src/components/Input";
import {
  addReview,
  getRatings,
  setModalWindow,
} from "src/redux/reducers/movieSlice";
import { useParams } from "react-router-dom";

const WriteReviewWindow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");

  const [rating, setRating] = useState(1);

  const onSendBtnClick = () => {
    if (id) {
      if (review.length > 0 && review.length <= 50) {
        setReviewError("The review must be at least 50 characters or none");
      } else if (review.length === 0) {
        dispatch(
          addReview({ mediaId: +id, mediaType: "title", score: rating })
        );
      } else {
        dispatch(
          addReview({ mediaId: +id, mediaType: "title", review, score: rating })
        );
      }

      dispatch(getRatings("me"));
    }
  };

  const onCancelBtnClick = () => {
    dispatch(setModalWindow(null));
  };

  useEffect(() => {
    if (review.length === 0 || review.length > 50) {
      setReviewError("");
    }
  }, [review]);

  return (
    <ModalWindow windowTitle="Write a Review">
      <RatingComponent title="Score" rating={rating} setRating={setRating} />
      <Input
        textarea
        title="Review (Optional)"
        placeholder="Review"
        onChange={setReview}
        errText={reviewError}
        value={review}
      />
      <div className={styles.buttonsWrapper}>
        <Button
          title="Send"
          onClick={onSendBtnClick}
          type={ButtonType.Primary}
          disabled={!!reviewError}
        />
        <Button
          title="Cancel"
          onClick={onCancelBtnClick}
          type={ButtonType.Secondary}
        />
      </div>
    </ModalWindow>
  );
};

export default WriteReviewWindow;
