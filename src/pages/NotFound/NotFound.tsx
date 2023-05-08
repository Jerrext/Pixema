import React from "react";
import styles from "./NotFound.module.scss";
import Button from "src/components/Button/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import classNames from "classnames";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const onHomeBtnClick = () => {
    navigate(RoutesList.Home);
  };
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapperLight]: theme === Theme.Light,
      })}
    >
      <div>
        <div className={styles.status}>404</div>
        <div className={styles.text}>Page not found</div>
        <Button
          title="Back to home"
          type={ButtonType.Primary}
          className={styles.homeBtn}
          onClick={onHomeBtnClick}
        />
      </div>
    </div>
  );
};

export default NotFound;
