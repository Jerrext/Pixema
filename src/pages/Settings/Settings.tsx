import React from "react";
import styles from "./Settings.module.scss";
import Switcher from "src/components/Switcher";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import { THEME } from "src/utils/constants";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";

const Settings = () => {
  const userData = useSelector(AuthSelectors.getUserData);

  const { theme, onChangeTheme } = useThemeContext();

  const onThemeClick = (value: Theme) => () => {
    onChangeTheme(value);
    localStorage.setItem(THEME, value);
  };

  const isDark = theme === Theme.Dark;

  return (
    <div className={styles.settingsWrapper}>
      <div>
        <h2 className={styles.title}>Profile</h2>
        <div
          className={classNames(styles.settingsItem, styles.profile, {
            [styles.settingsItemLight]: !isDark,
          })}
        >
          <div>
            <h3 className={styles.blockTitle}>Name</h3>
            <p className={styles.blockDesc}>
              {userData ? userData.display_name : "Loading..."}
            </p>
          </div>
          <div>
            <h3 className={styles.blockTitle}>Email</h3>
            <p className={styles.blockDesc}>
              {userData ? userData.email : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>Color mode</h2>
        <div
          className={classNames(styles.settingsItem, {
            [styles.settingsItemLight]: !isDark,
          })}
        >
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
    </div>
  );
};

export default Settings;
