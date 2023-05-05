import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { PixemaLogoIcon } from "src/assets/icons";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import Search from "src/components/Search";
import UserName from "src/components/UserName";
import classNames from "classnames";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

const Header = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const userData = useSelector(AuthSelectors.getUserData);

  const { theme } = useThemeContext();

  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? (
        <>
          <div
            className={classNames(styles.logoWrapper, {
              [styles.logoWrapperLight]: theme === Theme.Light,
            })}
          >
            <PixemaLogoIcon />
          </div>
          <Search />
          <UserName
            userName={userData ? userData.display_name : "Loading..."}
          />
        </>
      ) : (
        <PixemaLogoIcon />
      )}
    </div>
  );
};

export default Header;
