import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import { PixemaLogoIcon } from "src/assets/icons";

const Header = () => {
  const isLoggedIn = false;
  return (
    <div className={styles.wrapper}>
      {isLoggedIn ? <div></div> : <PixemaLogoIcon />}
    </div>
  );
};

export default Header;
