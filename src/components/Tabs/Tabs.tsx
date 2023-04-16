import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";
import { MovieTabsNames } from "src/utils/@globalTypes";
import { TabListType } from "./@types";

type TabsProps = {
  onClick: (key: MovieTabsNames) => void;
  tabsList: TabListType;
  activeTab: MovieTabsNames;
};

const Tabs: FC<TabsProps> = ({ onClick, tabsList, activeTab }) => {
  const onTabClick = (key: MovieTabsNames) => () => onClick(key);

  return (
    <div className={styles.tabsWrapper}>
      {tabsList.map((item) => {
        return (
          <div
            key={item.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === item.key,
            })}
            onClick={onTabClick(item.key)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
