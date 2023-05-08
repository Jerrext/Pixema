import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useDispatch } from "react-redux";
import { setModalWindow } from "src/redux/reducers/movieSlice";

type ModalWindowProps = {
  children: ReactNode;
  windowTitle: string;
  windowClassName?: string;
  closeBtnClassName?: string;
  closeBtnHide?: boolean;
};

const ModalWindow: FC<ModalWindowProps> = ({
  children,
  windowTitle,
  windowClassName,
  closeBtnClassName,
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
          [styles.windowLight]: theme === Theme.Light,
        })}
      >
        <div
          className={classNames(styles.closeBtn, closeBtnClassName, {
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
