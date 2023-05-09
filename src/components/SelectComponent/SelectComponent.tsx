import React, { FC, useEffect } from "react";
import Select, { OnChangeValue } from "react-select";
import "./SelectComponent.scss";
import classNames from "classnames";
import { OptionType, OptionsListType } from "./types";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type SelectComponentProps = {
  title: string;
  placeholder: string;
  isDisabled?: boolean;
  optionsList: OptionsListType;
  isMulti?: boolean;
  currentValues: string[] | string;
  setSelecValue: (value: any) => void;
  defaultValueId?: number;
  isSearchable?: boolean;
  isClearable?: boolean;
};

const SelectComponent: FC<SelectComponentProps> = ({
  title,
  placeholder,
  isDisabled,
  isMulti,
  optionsList,
  currentValues,
  setSelecValue,
  isSearchable,
  defaultValueId,
  isClearable,
}) => {
  const { theme } = useThemeContext();

  const isLight = theme === Theme.Light;

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
    setSelecValue(
      isMulti
        ? (newValue as OptionsListType).map((value) => value.value)
        : newValue
        ? (newValue as OptionType).value
        : ""
    );
  };

  useEffect(() => {
    defaultValueId !== undefined &&
      optionsList &&
      onChange(optionsList[defaultValueId]);
  }, [defaultValueId]);

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
            backgroundColor: state.isDisabled
              ? "#80858B"
              : isLight
              ? "#FFFFFF"
              : "#323537",
            color: state.isDisabled
              ? "#AFB2B6"
              : isLight
              ? "#000000"
              : "#FFFFFF",
            border: state.isFocused
              ? "2px solid #7B61FF"
              : state.isDisabled
              ? "2px solid #80858b"
              : isLight
              ? "2px solid #afb2b6"
              : "2px solid transparent",
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            paddingLeft: isMulti ? "13px" : "0",
          }),
          menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: isLight ? "#FFFFFF" : "#323537",
            border: isLight ? "1px solid #afb2b6" : "1px solid #242426",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: isLight ? "#FFFFFF" : "323537",
            borderBottom: isLight ? "1px solid #afb2b6" : "1px solid #242426",
          }),
        }}
        onChange={onChange}
        value={getValue()}
        className="customSelect"
        classNamePrefix="customSelect"
        isClearable={isClearable}
        isSearchable={isSearchable}
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
