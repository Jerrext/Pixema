import React, { KeyboardEvent, FC, useState } from "react";
import classNames from "classnames";
import styles from "./Search.module.scss";
import Input from "../Input";
import { FilterIcon, MagnifierIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { useNavigate } from "react-router-dom";

type SearchProps = {
  disabled?: boolean;
};

const Search: FC<SearchProps> = ({ disabled }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const { theme } = useThemeContext();

  const isLight = theme === Theme.Light;

  const onFilterClick = () => {};

  const onSearchClick = () => {
    searchValue.length > 0 && navigate(`/search/${searchValue}`);
  };

  const onEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <Input
        value={searchValue}
        onChange={setSearchValue}
        onKeyDown={onEnterDown}
        placeholder="Search"
        inputType="text"
        className={styles.search}
        disabled={disabled}
      />
      <div
        className={classNames(styles.magnifier, {
          [styles.filterLight]: isLight,
        })}
        onClick={onSearchClick}
      >
        <MagnifierIcon />
      </div>
      <div
        className={classNames(styles.filter, {
          [styles.disabledFilter]: disabled,
          [styles.filterLight]: isLight,
        })}
        onClick={disabled ? () => {} : onFilterClick}
      >
        <FilterIcon />
      </div>
    </div>
  );
};

export default Search;
