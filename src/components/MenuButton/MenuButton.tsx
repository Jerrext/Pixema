import React, { FC, ReactNode, useState } from "react";
import classNames from "classnames";
import styles from "./MenuButton.module.scss";
import { Link } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { DropDownListType, MenuButtonType } from "./@types";
import { useDispatch } from "react-redux";
import { setModalWindow } from "src/redux/reducers/movieSlice";
import { ModalWindowType } from "src/utils/@globalTypes";

type MenuButtonProps = {
  icon: ReactNode;
  title: string;
  disabled?: boolean;
  buttonType: MenuButtonType;
  routeLink?: RoutesList | string;
  dropDownList?: DropDownListType;
  location?: string;
};

const MenuButton: FC<MenuButtonProps> = ({
  icon,
  disabled,
  routeLink,
  title,
  location,
  buttonType,
  dropDownList,
}) => {
  const dispatch = useDispatch();

  const [dropDownMenuState, setDropDownMenuState] = useState(false);
  const onDropDownButtonClick = () => {
    setDropDownMenuState(!dropDownMenuState);
  };

  const onAddListBtnClick = () => {
    dispatch(setModalWindow(ModalWindowType.AddNewList));
  };

  return buttonType === MenuButtonType.Link && routeLink ? (
    <Link
      className={classNames(styles.homeLinkWrapper, {
        [styles.activePage]: location === routeLink,
        [styles.disabledLink]: disabled,
      })}
      to={routeLink}
    >
      {icon}
      <p>{title}</p>
    </Link>
  ) : (
    <div>
      <div
        className={classNames(styles.homeLinkWrapper, {
          [styles.disabledLink]: disabled,
        })}
        onClick={onDropDownButtonClick}
      >
        {icon}
        <p>{title}</p>
      </div>
      <div
        className={classNames(styles.dropDownMenu, {
          [styles.dropDownMenuOpened]: dropDownMenuState,
        })}
      >
        <div className={styles.listsWrapper}>
          {dropDownList &&
            dropDownList.map((item) => {
              return (
                <Link
                  className={classNames(styles.homeLinkWrapper, {
                    [styles.activePage]: location === item.routeLink,
                  })}
                  key={item.routeLink}
                  to={item.routeLink}
                >
                  <p>{item.title}</p>
                </Link>
              );
            })}
        </div>
        <div className={styles.addList} onClick={onAddListBtnClick}></div>
      </div>
    </div>
  );
};

export default MenuButton;
