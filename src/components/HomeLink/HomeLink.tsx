import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import classNames from "classnames";
import styles from "./HomeLink.module.scss";
import { HomeIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

type HomeLinkProps = {
  disabled?: boolean;
};

const HomeLink: FC<HomeLinkProps> = ({ disabled }) => {
  const navigate = useNavigate();
  const onHomeLinkClick = () => {
    navigate(RoutesList.Home);
  };
  return (
    <div
      className={classNames(styles.homeLinkWrapper, {
        [styles.disabledLink]: disabled,
      })}
      onClick={disabled ? () => {} : onHomeLinkClick}
    >
      <HomeIcon />
      <p>Home</p>
    </div>
  );
};

export default HomeLink;
