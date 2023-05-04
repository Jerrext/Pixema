import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./ModalWindow.module.scss";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  createMyList,
  setModalWindow,
  // setAddListWindowVisibility,
} from "src/redux/reducers/movieSlice";
import Input from "../Input/Input";
import SelectComponent from "../SelectComponent/SelectComponent";
import Button from "../Button/Button";
import { ButtonType, ModalWindowType } from "src/utils/@globalTypes";

type ModalWindowProps = {
  modalWindowType: ModalWindowType;
};

const ModalWindow: FC<ModalWindowProps> = ({ modalWindowType }) => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const [currentValues, setCurrentValues] = useState<string[] | string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [titleTouched, setTitleTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  const options = [
    { value: "true", label: "Public" },
    { value: "false", label: "Private" },
  ];

  const isPublic = currentValues === "true" ? true : false;
  const isRemoveWindow = modalWindowType === ModalWindowType.RemoveList;

  const setSelecValue = (value: string[] | string) => {
    setCurrentValues(value);
  };

  const onBlurTitle = () => {
    setTitleTouched(true);
  };

  const onBlurDescription = () => {
    setDescriptionTouched(true);
  };

  const onCreateBtnClick = () => {
    dispatch(
      createMyList({
        data: { details: { name: title, description, public: isPublic } },
      })
    );
  };

  const onCloseWindowBtnClick = () => {
    dispatch(setModalWindow(null));
  };

  const onRemoveBtnClick = () => {
    // dispatch()
  };

  useEffect(() => {
    if (titleTouched) {
      if (title.length === 0) {
        setTitleError("Title is required field");
      } else {
        setTitleError("");
      }
    }
  }, [title, titleTouched]);

  useEffect(() => {
    if (descriptionTouched) {
      if (description.length === 0) {
        setDescriptionError("Description is required field");
      } else {
        setDescriptionError("");
      }
    }
  }, [description, descriptionTouched]);

  const isValid = useMemo(() => {
    return (
      titleError.length === 0 &&
      descriptionError.length === 0 &&
      titleTouched &&
      descriptionTouched
    );
  }, [titleError, descriptionError, titleTouched, descriptionTouched]);

  return (
    <div className={styles.windowWrapper} onClick={onCloseWindowBtnClick}>
      <div
        className={classNames(styles.window, {
          [styles.windowRemoveConfirm]: isRemoveWindow,
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={classNames(styles.closeBtn, {
            [styles.closeBtnHide]: isRemoveWindow,
          })}
          onClick={onCloseWindowBtnClick}
        ></div>
        <div className={styles.windowContent}>
          {modalWindowType === ModalWindowType.AddNewList && (
            <>
              <h3 className={styles.windowTitle}>Create a new list</h3>
              <div className={styles.topInputsWrapper}>
                <Input
                  value={title}
                  title="Name"
                  placeholder="List name"
                  errText={titleError}
                  onBlur={onBlurTitle}
                  onChange={setTitle}
                  inputType="text"
                  className={styles.input}
                />
                <SelectComponent
                  title="Visibility"
                  placeholder="List visibility"
                  optionsList={options}
                  currentValues={currentValues}
                  setSelecValue={setSelecValue}
                  defaultValueId={1}
                  isSearchable={false}
                  isClearable={false}
                />
              </div>
              <Input
                value={description}
                title="Description"
                textarea
                placeholder="List description"
                errText={descriptionError}
                onBlur={onBlurDescription}
                onChange={setDescription}
                className={styles.input}
              />
              <Button
                title="Create"
                onClick={onCreateBtnClick}
                disabled={!isValid}
                type={ButtonType.Primary}
                className={styles.createBtn}
              />
            </>
          )}
          {isRemoveWindow && (
            <>
              <h3 className={styles.windowTitle}>Confirm the removal</h3>
              <p>Are you sure you want to remove this list?</p>
              <div className={styles.confirmControls}>
                <Button
                  title="Yes"
                  onClick={onRemoveBtnClick}
                  type={ButtonType.Secondary}
                />
                <Button
                  title="Cancel"
                  onClick={onCloseWindowBtnClick}
                  type={ButtonType.Secondary}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
