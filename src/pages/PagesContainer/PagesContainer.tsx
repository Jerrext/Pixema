import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import Sidebar from "./Sidebar/Sidebar";

const PagesContainer = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const footerContent = (
    <div className={styles.footerText}>© All Rights Reserved</div>
  );
  return (
    <div className={styles.wrapper}>
      {!isLoggedIn && <div className={styles.formPagesBackground}></div>}
      <div className={styles.pagesWrapper}>
        <Header />
        <div className={styles.mainWrapper}>
          {isLoggedIn && <Sidebar footerContent={footerContent} />}
          <Outlet />
        </div>
        {!isLoggedIn && <div className={styles.footer}>{footerContent}</div>}
      </div>
    </div>
  );
};

export default PagesContainer;
