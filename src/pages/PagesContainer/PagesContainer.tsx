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
import { MovieSelectors } from "src/redux/reducers/movieSlice";
import AddListWindow from "src/components/ModalWindow/AddListWindow";
import { ModalWindowType } from "src/utils/@globalTypes";
import RemoveListWindow from "src/components/ModalWindow/RemoveListWindow";
import FilterWindow from "src/components/ModalWindow/FilterWindow";
import EditListWindow from "src/components/ModalWindow/EditListWindow/EditListWindow";
import WriteReviewWindow from "src/components/ModalWindow/WriteReviewWindow/WriteReviewWindow";

const PagesContainer = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const message = useSelector(MessageSelectors.getMessage);
  const modalWindow = useSelector(MovieSelectors.getModalWindow);
  const currentList = useSelector(MovieSelectors.getCurrentList);
  const filters = useSelector(MovieSelectors.getFilters);

  const { theme } = useThemeContext();

  const footerContent = (
    <div className={styles.footerText}>© All Rights Reserved</div>
  );

  const getCurrentWindow = () => {
    switch (modalWindow) {
      case ModalWindowType.AddNewList:
        return <AddListWindow />;
      case ModalWindowType.RemoveList:
        return <RemoveListWindow currentList={currentList} />;
      case ModalWindowType.FilterWindow:
        return <FilterWindow filters={filters} />;
      case ModalWindowType.EditList:
        return <EditListWindow currentList={currentList} />;
      case ModalWindowType.WriteReviewWindow:
        return <WriteReviewWindow />;
      default:
        return;
    }
  };
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
      {getCurrentWindow()}
    </div>
  );
};

export default PagesContainer;
