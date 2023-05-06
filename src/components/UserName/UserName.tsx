import React, { FC, useEffect, useState } from "react";
import styles from "./UserName.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

type userNameProps = { userName: string };

const UserName: FC<userNameProps> = ({ userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { theme } = useThemeContext();

  const isDark = theme === Theme.Light;

  const initials = userName
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  const dropdownButtonsList = [
    {
      title: "Profile",
      onClick: () => {
        navigate(RoutesList.Settings);
      },
    },
    {
      title: "Logout",
      onClick: () => {
        dispatch(logoutUser());
      },
    },
  ];

  const onUserNameClick = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  return (
    <div
      className={classNames(styles.userNameWrapper, {
        [styles.userNameWrapperLight]: isDark,
      })}
      onClick={onUserNameClick}
    >
      <div className={styles.initials}>{initials}</div>
      <p>{userName}</p>
      <div
        className={classNames(styles.dropdownWrapper, {
          [styles.dropdownOpenedWrapper]: isDropdownOpened,
          [styles.dropdownWrapperLight]: isDark,
        })}
      >
        {dropdownButtonsList.map(({ title, onClick }, index) => {
          return (
            <div
              className={styles.dropdownItem}
              key={title + index}
              onClick={onClick}
            >
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserName;
