import React, { FC, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./AddNewListWindow.module.scss";
import { ArrowIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  createMyList,
  setAddListWindowVisibility,
} from "src/redux/reducers/movieSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { ButtonType } from "src/utils/@globalTypes";
import SelectComponent from "../SelectComponent/SelectComponent";

const AddNewListWindow = () => {
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

  const setSelecValue = (value: string[] | string) => {
    setCurrentValues(value);
  };

  useEffect(() => {
    console.log(title, description, currentValues);
  }, [currentValues]);

  const onBlurTitle = () => {
    setTitleTouched(true);
  };

  const onBlurDescription = () => {
    setDescriptionTouched(true);
  };

  const onCloseWindowBtnClick = () => {
    dispatch(setAddListWindowVisibility(false));
  };

  const onCreateBtnClick = () => {
    dispatch(
      createMyList({
        data: { details: { name: title, description, public: isPublic } },
      })
    );
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
        className={styles.window}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.closeBtn} onClick={onCloseWindowBtnClick}></div>
        <h3 className={styles.windowTitle}>Create a new list</h3>
        <div className={styles.windowContent}>
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
        </div>
      </div>
    </div>
  );
};

export default AddNewListWindow;
