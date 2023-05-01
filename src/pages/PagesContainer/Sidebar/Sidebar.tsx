import React, { FC, ReactNode } from "react";
import styles from "./Sidebar.module.scss";
import {
  FavoriteIcon,
  HomeIcon,
  SettingsIcon,
  TrendIcon,
} from "src/assets/icons";
import { RoutesList } from "src/pages/Router";
import MenuButton from "src/components/MenuButton";
import { useLocation } from "react-router-dom";

type SidebarProps = {
  footerContent: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ footerContent }) => {
  const location = useLocation();

  const navButtonsList = [
    {
      title: "Home",
      key: RoutesList.Home,
      icon: <HomeIcon />,
      disabled: false,
    },
    {
      title: "Trends",
      key: RoutesList.Trends,
      icon: <TrendIcon />,
      disabled: false,
    },
    {
      title: "Favorites",
      key: RoutesList.Favorites,
      icon: <FavoriteIcon />,
      disabled: false,
    },
    {
      title: "Settings",
      key: RoutesList.Settings,
      icon: <SettingsIcon />,
      disabled: false,
    },
  ];

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
                title={item.title}
                routeLink={item.key}
                activePage={location.pathname === item.key}
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
