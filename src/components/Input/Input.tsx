import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type InputProps = {
  value: string;
  title?: string;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputType: string;
  disabled?: boolean;
  errText?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

const Input: FC<InputProps> = ({
  value,
  title,
  placeholder,
  inputType,
  disabled,
  errText,
  className,
  onChange,
  onBlur,
  onKeyDown,
}) => {
  const { theme } = useThemeContext();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.inputWrapper}>
      <p className={styles.title}>{title}</p>
      <input
        value={value}
        className={classNames(styles.input, className, {
          [styles.disabledInp]: disabled,
          [styles.errorInput]: errText,
          [styles.inputLight]: theme === Theme.Light,
        })}
        type={inputType}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
        onChange={onChangeText}
      />
      {errText && <p className={styles.errorText}>{errText}</p>}
    </div>
  );
};

export default Input;
