import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { PixemaLogoIcon } from "src/assets/icons";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";

const Header = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? <div></div> : <PixemaLogoIcon />}
    </div>
  );
};

export default Header;
