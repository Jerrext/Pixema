import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";

enum TabsNames {
  Rating = "Rating",
  Year = "Year",
}

type TabsProps = {
  onClick: (key: TabsNames) => void;
  // activeTab: number;
};

const Tabs: FC<TabsProps> = ({ onClick }) => {
  const [tabState, setTabState] = useState(TabsNames.Rating);
  const onTabClick = (key: TabsNames) => () => setTabState(key);
  return (
    <div className={styles.tabsWrapper}>
      <div
        className={classNames(styles.tab, {
          [styles.activeTab]: tabState === TabsNames.Rating,
        })}
        onClick={onTabClick(TabsNames.Rating)}
      >
        {TabsNames.Rating}
      </div>
      <div
        className={classNames(styles.tab, {
          [styles.activeTab]: tabState === TabsNames.Year,
        })}
        onClick={onTabClick(TabsNames.Year)}
      >
        {TabsNames.Year}
      </div>
    </div>
  );
};

export default Tabs;
