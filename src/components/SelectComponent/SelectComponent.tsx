import React, { FC, useState } from "react";
import Select from "react-select";
import "./SelectComponent.scss";
// import styles from "./SelectComponent.module.scss";
import classNames from "classnames";

type SelectedProps = {
  title: string;
  placeholder: string;
  isDisabled?: boolean;
  SelectList?: [];
};

const SelectComponent: FC<SelectedProps> = ({
  title,
  placeholder,
  isDisabled,
  SelectList,
}) => {
  const [currentValue, setCurrentValue] = useState();

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const getValue = () => {
    return currentValue
      ? options.find((item) => item.value === currentValue)
      : "";
  };

  const onChange = (newValue: any) => {
    setCurrentValue(newValue ? newValue.value : "");
  };

  return (
    <div>
      <p>{title}</p>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isDisabled ? "#80858B" : "#323537",
            border: state.isFocused
              ? "2px solid #7B61FF"
              : "2px solid transparent",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isDisabled ? "#AFB2B6" : "#80858B",
          }),
        }}
        onChange={onChange}
        value={getValue()}
        className="customSelect"
        classNamePrefix="customSelect"
        isClearable={true}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        unstyled
      />
    </div>
  );
};

export default SelectComponent;
