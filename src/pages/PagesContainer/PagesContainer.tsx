import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import Header from "./Header";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import Sidebar from "./Sidebar/Sidebar";
import { MovieSelectors } from "src/redux/reducers/movieSlice";
import Message from "src/components/Message/Message";
import { MessageSelectors } from "src/redux/reducers/messageSlice";

const PagesContainer = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const message = useSelector(MessageSelectors.getMessage);

  const footerContent = (
    <div className={styles.footerText}>© All Rights Reserved</div>
  );
  return (
    <div
      className={classNames(styles.pagesWrapper, {
        [styles.formPagesBackground]: !isLoggedIn,
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
