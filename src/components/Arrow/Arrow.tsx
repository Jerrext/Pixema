import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Arrow.module.scss";
import { ArrowIcon } from "src/assets/icons";

type ArrowProps = {
  disabled?: boolean;
  onClick: () => void;
};

const Arrow: FC<ArrowProps> = ({ disabled, onClick }) => {
  return (
    <div
      className={classNames(styles.arrowWrapper, {
        [styles.disabledArrow]: disabled,
      })}
      onClick={disabled ? () => {} : onClick}
    >
      <ArrowIcon />
    </div>
  );
};

export default Arrow;
