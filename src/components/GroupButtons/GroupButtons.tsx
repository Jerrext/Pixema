import React, { FC } from "react";
import classNames from "classnames";
import styles from "./GroupButtons.module.scss";
import { BookmarkIcon, SocialIcon } from "src/assets/icons";

type GroupButtonsProps = {
  disabled?: boolean;
};

const GroupButtons: FC<GroupButtonsProps> = ({ disabled }) => {
  const onBookmarkBtnClick = () => {};
  const onSocialBtnClick = () => {};
  return (
    <div
      className={classNames(styles.groupButtonsWrapper, {
        [styles.disabledGroupButtonsWrapper]: disabled,
      })}
    >
      <div
        className={styles.button}
        onClick={disabled ? () => {} : onBookmarkBtnClick}
      >
        <BookmarkIcon />
      </div>
      <div
        className={styles.button}
        onClick={disabled ? () => {} : onSocialBtnClick}
      >
        <SocialIcon />
      </div>
    </div>
  );
};

export default GroupButtons;
