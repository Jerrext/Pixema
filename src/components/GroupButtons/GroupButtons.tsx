import React, { FC } from "react";
import classNames from "classnames";
import styles from "./GroupButtons.module.scss";
import { GroupButtonList } from "./@types";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type GroupButtonsProps = {
  groupButtonsList: GroupButtonList;
  disabled?: boolean;
};

const GroupButtons: FC<GroupButtonsProps> = ({
  disabled,
  groupButtonsList,
}) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={classNames(styles.groupButtonsWrapper, {
        [styles.disabledGroupButtonsWrapper]: disabled,
        [styles.groupButtonsWrapperLight]: theme === Theme.Light,
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
