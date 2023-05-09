import React, { FC, useEffect, useState } from "react";
import styles from "./WriteReviewWindow.module.scss";
import { useDispatch } from "react-redux";
import { ButtonType } from "src/utils/@globalTypes";
import Button from "src/components/Button";
import ModalWindow from "../ModalWindow";
import RatingComponent from "src/components/RatingComponent";
import Input from "src/components/Input";
import { setModalWindow } from "src/redux/reducers/movieSlice";

const WriteReviewWindow = () => {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState("");

  const onSendBtnClick = () => {
    if (review.length > 0 && review.length <= 50) {
      setReviewError("The review must be at least 50 characters or none");
    } else {
      // dispatch()
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
      <RatingComponent title="Score" />
      <Input
        textarea
        title="Review"
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
