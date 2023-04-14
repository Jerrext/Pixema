import React, { FC, useEffect, useState } from "react";
import styles from "./UserName.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";

type userNameProps = { userName: string };

const UserName: FC<userNameProps> = ({ userName }) => {
  const dispatch = useDispatch();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const initials = userName
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  const dropdownButtonsList = [
    {
      title: "Edit profile",
      onClick: () => {},
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
    <div className={styles.userNameWrapper} onClick={onUserNameClick}>
      <div className={styles.initials}>{initials}</div>
      <p>{userName}</p>
      <div
        className={classNames(styles.dropdownWrapper, {
          [styles.dropdownOpenedWrapper]: isDropdownOpened,
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
