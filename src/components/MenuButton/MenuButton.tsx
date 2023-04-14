import React, { ChangeEvent, FC, KeyboardEvent, ReactNode } from "react";
import classNames from "classnames";
import styles from "./MenuButton.module.scss";
import { HomeIcon } from "src/assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

type MenuButtonProps = {
  icon: ReactNode;
  title: string;
  disabled?: boolean;
  routeLink: RoutesList;
};

const MenuButton: FC<MenuButtonProps> = ({
  icon,
  disabled,
  routeLink,
  title,
}) => {
  return (
    <Link
      className={classNames(styles.homeLinkWrapper, {
        [styles.disabledLink]: disabled,
      })}
      to={routeLink}
    >
      {icon}
      <p>{title}</p>
    </Link>
  );
};

export default MenuButton;
