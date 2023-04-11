import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Search.module.scss";
import Input from "../Input";
import { FilterIcon } from "src/assets/icons";

type SearchProps = {
  disabled?: boolean;
};

const Search: FC<SearchProps> = ({ disabled }) => {
  const [searchValue, setSearchValue] = useState("");

  const onFilterClick = () => {};

  return (
    <div className={styles.searchWrapper}>
      <Input
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search"
        inputType="text"
        className={styles.search}
        disabled={disabled}
      />
      <div
        className={classNames(styles.filter, {
          [styles.disabledFilter]: disabled,
        })}
        onClick={disabled ? () => {} : onFilterClick}
      >
        <FilterIcon />
      </div>
    </div>
  );
};

export default Search;
