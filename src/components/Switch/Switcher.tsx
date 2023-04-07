import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Switcher.module.scss";

type SwitchProps = {
  disabled?: boolean;
};

const Switcher: FC<SwitchProps> = ({ disabled }) => {
  const [switchState, setSwitchState] = useState(false);
  const onSwitcherClick = () => {
    setSwitchState(!switchState);
  };

  return (
    <div
      className={classNames(styles.switchWrapper, {
        [styles.disabledSwitchWrapperOff]: disabled,
        [styles.disabledSwitchWrapperOn]: disabled && switchState,
        [styles.switcherOnWrapper]: switchState && !disabled,
      })}
      onClick={disabled ? () => {} : onSwitcherClick}
    >
      <div className={styles.switcher}></div>
    </div>
  );
};

export default Switcher;
