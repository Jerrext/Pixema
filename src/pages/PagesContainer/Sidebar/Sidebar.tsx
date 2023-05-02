import React, { FC, ReactNode, useMemo, useEffect, useCallback } from "react";
import styles from "./Sidebar.module.scss";
import {
  EyeIcon,
  FavoriteIcon,
  HomeIcon,
  SettingsIcon,
  TrendIcon,
} from "src/assets/icons";
import { RoutesList } from "src/pages/Router";
import MenuButton from "src/components/MenuButton";
import { useLocation } from "react-router-dom";
import { MenuButtonType } from "src/components/MenuButton/@types";
import { useSelector } from "react-redux";
import { MovieSelectors } from "src/redux/reducers/movieSlice";

type SidebarProps = {
  footerContent: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ footerContent }) => {
  const location = useLocation();

  const moviesLists = useSelector(MovieSelectors.getMyMoviesLists);

  const filderedMoviesLists = moviesLists.filter(
    (item) => item.name !== "Favorites" && item.name !== "watchlist"
  );

  const navButtonsList = useMemo(
    () => [
      {
        title: "Home",
        icon: <HomeIcon />,
        key: RoutesList.Home,
        disabled: false,
        buttonType: MenuButtonType.Link,
        routeLink: RoutesList.Home,
      },
      {
        title: "Trends",
        icon: <TrendIcon />,
        key: RoutesList.Trends,
        disabled: false,
        buttonType: MenuButtonType.Link,
        routeLink: RoutesList.Trends,
      },
      {
        title: "Favorites",
        icon: <FavoriteIcon />,
        key: Math.random() * Math.random(),
        disabled: false,
        buttonType: MenuButtonType.Link,
        routeLink: `/lists/${
          moviesLists.find((item) => item.name === "Favorites")?.id
        }`,
      },
      {
        title: "Watched",
        icon: <EyeIcon />,
        key: Math.random() * Math.random(),
        disabled: false,
        buttonType: MenuButtonType.Link,
        routeLink: `/lists/${
          moviesLists.find((item) => item.name === "watchlist")?.id
        }`,
      },
      {
        title: "Lists",
        icon: <span className={styles.circle}></span>,
        dropDownList: filderedMoviesLists.map((item) => {
          return {
            title: item.name,
            routeLink: `/lists/${item.id}`,
          };
        }),
        key: Math.random() * Math.random(),
        disabled: false,
        buttonType: MenuButtonType.DropDownButton,
      },
      {
        title: "Settings",
        icon: <SettingsIcon />,
        disabled: false,
        key: RoutesList.Settings,
        buttonType: MenuButtonType.Link,
        routeLink: RoutesList.Settings,
      },
    ],
    [moviesLists]
  );

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.ButtonsWrapper}>
          {navButtonsList.map((item) => {
            return (
              <MenuButton
                disabled={item.disabled}
                key={item.key}
                icon={item.icon}
                buttonType={item.buttonType}
                title={item.title}
                routeLink={
                  item.buttonType === MenuButtonType.Link
                    ? item.routeLink
                    : undefined
                }
                dropDownList={item.dropDownList}
                location={location.pathname}
              />
            );
          })}
        </div>
        {footerContent}
      </div>
    </div>
  );
};

export default Sidebar;
