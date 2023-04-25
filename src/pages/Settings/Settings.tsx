import React, { useEffect, useMemo, useState } from "react";
import styles from "./Settings.module.scss";
import Switcher from "src/components/Switcher";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { THEME } from "src/utils/constants";

const Settings = () => {
  const { theme, onChangeTheme } = useThemeContext();

  const onThemeClick = (value: Theme) => () => {
    onChangeTheme(value);
    localStorage.setItem(THEME, value);
  };

  const isDark = theme === Theme.Dark;

  return (
    <div>
      <h2 className={styles.title}>Color mode</h2>
      <div className={styles.settingsItem}>
        <div>
          <h3 className={styles.blockTitle}>{isDark ? "Dark" : "Light"}</h3>
          <p className={styles.blockDesc}>
            Use {isDark ? "dark" : "light"} thema
          </p>
        </div>
        <Switcher
          onClick={onThemeClick(isDark ? Theme.Light : Theme.Dark)}
          state={isDark ? true : false}
        />
      </div>
    </div>
  );
};

export default Settings;
