import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import Sidebar from "./Sidebar";
import Message from "src/components/Message";
import { MessageSelectors } from "src/redux/reducers/messageSlice";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

const PagesContainer = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const message = useSelector(MessageSelectors.getMessage);

  const { theme } = useThemeContext();

  const footerContent = (
    <div className={styles.footerText}>© All Rights Reserved</div>
  );
  return (
    <div
      className={classNames(styles.pagesWrapper, {
        [styles.formPagesBackground]: !isLoggedIn,
        [styles.pageWrapperLight]: theme === Theme.Light,
      })}
    >
      <Header />
      <div className={classNames({ [styles.mainWrapper]: isLoggedIn })}>
        {isLoggedIn && <Sidebar footerContent={footerContent} />}
        <div className={styles.scrollWrapper}>
          <div className={styles.pageWrapper}>
            <Outlet />
          </div>
        </div>
      </div>
      {!isLoggedIn && <div className={styles.footer}>{footerContent}</div>}
      {message && <Message status={message.status} message={message.message} />}
    </div>
  );
};

export default PagesContainer;
