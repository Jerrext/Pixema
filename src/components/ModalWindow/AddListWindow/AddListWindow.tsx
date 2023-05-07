import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "./AddListWindow.module.scss";
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

const AddListWindow = () => {
  const dispatch = useDispatch();

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
    <ModalWindow windowTitle="Create a new list">
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
    </ModalWindow>
  );
};

export default AddListWindow;
