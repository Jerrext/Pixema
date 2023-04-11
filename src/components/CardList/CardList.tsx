import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CardList.module.scss";
import { CardListType } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import EmptyState from "../EmptyState";

type CardListProps = {
  cardList: CardListType;
};

const CardList: FC<CardListProps> = ({ cardList }) => {
  return cardList.length > 0 ? (
    <div className={styles.wrapper}>
      {cardList.map((item) => {
        return <Card card={item} key={item.id} />;
      })}
    </div>
  ) : (
    <EmptyState
      title="Sorry, movie list is empty"
      description="Try reloading the page or check back later"
    />
  );
};

export default CardList;
