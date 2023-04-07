import React, { ChangeEvent, FC, ReactNode, KeyboardEvent } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";
import { HomeIcon } from "src/assets/icons";

type ButtonProps = {
  title: string | ReactNode;
  disabled?: boolean;
  type: ButtonType;
  className?: string;
  onClick: () => void;
};

export enum ButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
}

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
