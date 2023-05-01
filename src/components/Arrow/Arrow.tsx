import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Arrow.module.scss";
import { ArrowIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type ArrowProps = {
  disabled?: boolean;
  onClick: () => void;
};

const Arrow: FC<ArrowProps> = ({ disabled, onClick }) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={classNames(styles.arrowWrapper, {
        [styles.arrowWrapperLight]: theme === Theme.Light,
        [styles.disabledArrow]: disabled,
      })}
      onClick={disabled ? () => {} : onClick}
    >
      <ArrowIcon />
    </div>
  );
};

export default Arrow;
