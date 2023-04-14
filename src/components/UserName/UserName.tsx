import React, { FC, useEffect, useState } from "react";
import styles from "./UserName.module.scss";
import classNames from "classnames";

type userNameProps = { userName: string };

const UserName: FC<userNameProps> = ({ userName }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const initials = userName
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");

  const dropdownButtonsList = [
    {
      title: "item 1",
    },
    {
      title: "item 2",
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
        {dropdownButtonsList.map(({ title }, index) => {
          return (
            <div className={styles.dropdownItem} key={title + index}>
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserName;
