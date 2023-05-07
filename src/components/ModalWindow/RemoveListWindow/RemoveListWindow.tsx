import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./RemoveListWindow.module.scss";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  createMyList,
  removeList,
  setModalWindow,
  // setAddListWindowVisibility,
} from "src/redux/reducers/movieSlice";

import { ButtonType, ModalWindowType } from "src/utils/@globalTypes";
import { ListData } from "src/redux/sagas/@types";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input/Input";
import SelectComponent from "src/components/SelectComponent/SelectComponent";
import Button from "src/components/Button/Button";
import ModalWindow from "../ModalWindow";

type ModalWindowProps = {
  currentList: ListData | null;
};

const RemoveListWindow: FC<ModalWindowProps> = ({ currentList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemoveBtnClick = () => {
    currentList &&
      dispatch(
        removeList({
          id: currentList.id,
          callback: () => {
            navigate(RoutesList.Home);
          },
        })
      );
  };

  return (
    <ModalWindow
      windowTitle="Confirm the removal"
      closeBtnHide
      windowClassName={styles.windowRemoveConfirm}
    >
      <p>Are you sure you want to remove this list?</p>
      <div className={styles.confirmControls}>
        <Button
          title="Yes"
          onClick={onRemoveBtnClick}
          type={ButtonType.Secondary}
        />
        <Button
          title="Cancel"
          onClick={() => dispatch(setModalWindow(null))}
          type={ButtonType.Secondary}
        />
      </div>
    </ModalWindow>
  );
};

export default RemoveListWindow;
