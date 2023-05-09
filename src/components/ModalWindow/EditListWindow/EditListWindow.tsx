import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./EditListWindow.module.scss";
import { useDispatch } from "react-redux";
import { editList } from "src/redux/reducers/movieSlice";
import { ButtonType } from "src/utils/@globalTypes";
import { ListData } from "src/redux/sagas/@types";
import Button from "src/components/Button";
import ModalWindow from "../ModalWindow";
import Input from "src/components/Input";
import SelectComponent from "src/components/SelectComponent";

const options = [
  { value: "true", label: "Public" },
  { value: "false", label: "Private" },
];

type EditListWindowProps = {
  currentList: ListData | null;
};

const EditListWindow: FC<EditListWindowProps> = ({ currentList }) => {
  const dispatch = useDispatch();

  const [currentValues, setCurrentValues] = useState<string[] | string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const isPublic = currentValues === "true" ? true : false;

  const setSelecValue = (value: string[] | string) => {
    setCurrentValues(value);
  };

  const onEditBtnClick = () => {
    dispatch(
      editList({
        id: currentList?.id,
        data: { details: { name: title, description, public: isPublic } },
      })
    );
  };

  useEffect(() => {
    if (currentList) {
      setCurrentValues(currentList.public ? "true" : "false");
      setTitle(currentList.name);
      setDescription(currentList.description);
    }
  }, [currentList]);

  useEffect(() => {
    if (title.length === 0) {
      setTitleError("Title is required field");
    } else {
      setTitleError("");
    }
  }, [title]);

  useEffect(() => {
    if (description.length === 0) {
      setDescriptionError("Description is required field");
    } else {
      setDescriptionError("");
    }
  }, [description]);

  const isValid = useMemo(() => {
    return titleError.length === 0 && descriptionError.length === 0;
  }, [titleError, descriptionError]);

  return (
    currentList && (
      <ModalWindow windowTitle="Edit list">
        <div className={styles.topInputsWrapper}>
          <Input
            value={title}
            title="Name"
            placeholder="List name"
            errText={titleError}
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
          onChange={setDescription}
          className={styles.input}
        />
        <Button
          title="Save"
          onClick={onEditBtnClick}
          disabled={!isValid}
          type={ButtonType.Primary}
          className={styles.createBtn}
        />
      </ModalWindow>
    )
  );
};

export default EditListWindow;
