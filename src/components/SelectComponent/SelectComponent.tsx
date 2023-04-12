import React, { FC, useState } from "react";
import Select, { OnChangeValue } from "react-select";
import "./SelectComponent.scss";
import classNames from "classnames";
import { OptionType, OptionsListType } from "./types";

type SelectComponentProps = {
  title: string;
  placeholder: string;
  isDisabled?: boolean;
  optionsList: OptionsListType;
  isMulti?: boolean;
};

const SelectComponent: FC<SelectComponentProps> = ({
  title,
  placeholder,
  isDisabled,
  isMulti,
  optionsList,
}) => {
  const [currentValues, setCurrentValues] = useState<string[] | string>();

  const getValue = () => {
    if (currentValues) {
      return isMulti
        ? optionsList.filter(
            (option) => currentValues.indexOf(option.value) >= 0
          )
        : optionsList.find((option) => option.value === currentValues);
    } else {
      return null;
    }
  };

  const onChange = (newValue: OnChangeValue<OptionType, boolean>) => {
    setCurrentValues(
      isMulti
        ? (newValue as OptionsListType).map((value) => value.value)
        : newValue
        ? (newValue as OptionType).value
        : ""
    );
  };

  return (
    <div
      className={classNames({
        ["multiSelectWrapper"]: isMulti,
      })}
    >
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
        options={optionsList}
        placeholder={placeholder}
        isDisabled={isDisabled}
        closeMenuOnSelect={isMulti && false}
        isMulti={isMulti}
        unstyled
      />
    </div>
  );
};

export default SelectComponent;
