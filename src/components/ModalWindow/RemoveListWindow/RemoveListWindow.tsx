import React, { FC } from "react";
import styles from "./RemoveListWindow.module.scss";
import { useDispatch } from "react-redux";
import { removeList, setModalWindow } from "src/redux/reducers/movieSlice";
import { ButtonType } from "src/utils/@globalTypes";
import { ListData } from "src/redux/sagas/@types";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import Button from "src/components/Button";
import ModalWindow from "../ModalWindow";

type RemoveListWindowProps = {
  currentList: ListData | null;
};

const RemoveListWindow: FC<RemoveListWindowProps> = ({ currentList }) => {
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
