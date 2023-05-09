import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Switcher.module.scss";

type SwitchProps = {
  disabled?: boolean;
  onClick: () => void;
  state: boolean;
};

const Switcher: FC<SwitchProps> = ({ disabled, onClick, state }) => {
  return (
    <div
      className={classNames(styles.switchWrapper, {
        [styles.disabledSwitchWrapperOff]: disabled,
        [styles.disabledSwitchWrapperOn]: disabled && state,
        [styles.switcherOnWrapper]: state && !disabled,
      })}
      onClick={disabled ? () => {} : onClick}
    >
      <div className={styles.switcher}></div>
    </div>
  );
};

export default Switcher;
