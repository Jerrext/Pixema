import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import Header from "./Header";

const PagesContainer = () => {
  const isLoggedIn = false;
  return (
    <div className={styles.wrapper}>
      {!isLoggedIn && <div className={styles.formPagesBackground}></div>}
      <div className={styles.pagesWrapper}>
        <Header />
        <div className={styles.mainWrapper}>
          {isLoggedIn && <div>Sidebar</div>}
          <Outlet />
        </div>
        <div className={styles.footer}>
          <div>© All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
};

export default PagesContainer;
