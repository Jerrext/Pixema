import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";
import { ButtonType } from "src/utils/@globalTypes";

type ButtonProps = {
  title: string | ReactNode;
  disabled?: boolean;
  type: ButtonType;
  className?: string;
  onClick: () => void;
};

const btnStyles = {
  [ButtonType.Primary]: styles.primaryBtn,
  [ButtonType.Secondary]: styles.secondaryBtn,
};

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  type,
  disabled,
  className,
}) => {
  const btnClassName = btnStyles[type];
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames(btnClassName, className, {
        [styles.disabledBtn]: disabled,
      })}
    >
      {title}
    </div>
  );
};

export default Button;
