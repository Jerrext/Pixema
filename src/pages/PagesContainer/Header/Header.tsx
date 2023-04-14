import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { PixemaLogoIcon } from "src/assets/icons";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import Search from "src/components/Search";
import UserName from "src/components/UserName";

const Header = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const userName = useSelector(AuthSelectors.getUserName);

  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? (
        <>
          <div className={styles.logoWrapper}>
            <PixemaLogoIcon />
          </div>
          <Search />
          <UserName userName={userName ? userName : "No Name"} />
        </>
      ) : (
        <PixemaLogoIcon />
      )}
    </div>
  );
};

export default Header;
