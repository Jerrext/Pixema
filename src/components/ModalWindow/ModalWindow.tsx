import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  createMyList,
  removeList,
  setModalWindow,
  // setAddListWindowVisibility,
} from "src/redux/reducers/movieSlice";
import Input from "../Input/Input";
import SelectComponent from "../SelectComponent/SelectComponent";
import Button from "../Button/Button";
import { ButtonType, ModalWindowType } from "src/utils/@globalTypes";
import { ListData } from "src/redux/sagas/@types";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

type ModalWindowProps = {
  modalWindowType?: ModalWindowType;
  children: ReactNode;
  windowTitle: string;
  windowClassName?: string;
  // closeBtnClassName?: string;
  closeBtnHide?: boolean;
};

const ModalWindow: FC<ModalWindowProps> = ({
  modalWindowType,
  children,
  windowTitle,
  windowClassName,
  // closeBtnClassName,
  closeBtnHide,
}) => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const onCloseWindowBtnClick = () => {
    dispatch(setModalWindow(null));
  };

  return (
    <div className={styles.windowWrapper}>
      <div className={styles.overlay} onClick={onCloseWindowBtnClick}></div>
      <div
        className={classNames(styles.window, windowClassName, {
          // [styles.windowRemoveConfirm]: isRemoveWindow,
          [styles.windowLight]: theme === Theme.Light,
        })}
      >
        <div
          className={classNames(styles.closeBtn, {
            [styles.closeBtnHide]: closeBtnHide,
          })}
          onClick={onCloseWindowBtnClick}
        ></div>
        <div className={styles.windowContent}>
          <h3 className={styles.windowTitle}>{windowTitle}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
