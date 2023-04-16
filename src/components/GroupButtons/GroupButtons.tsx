import React, { FC } from "react";
import classNames from "classnames";
import styles from "./GroupButtons.module.scss";
import { BookmarkIcon, SocialIcon } from "src/assets/icons";
import { GroupButtonList } from "./@types";

type GroupButtonsProps = {
  groupButtonsList: GroupButtonList;
  disabled?: boolean;
};

const GroupButtons: FC<GroupButtonsProps> = ({
  disabled,
  groupButtonsList,
}) => {
  return (
    <div
      className={classNames(styles.groupButtonsWrapper, {
        [styles.disabledGroupButtonsWrapper]: disabled,
      })}
    >
      {groupButtonsList.map((item, index) => {
        return (
          <div
            key={index + Math.random()}
            className={styles.button}
            onClick={item.onClick}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default GroupButtons;
