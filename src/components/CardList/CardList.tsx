import React, { FC } from "react";
import classNames from "classnames";
import styles from "./CardList.module.scss";
import { CardListType, SearchListType } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import EmptyState from "../EmptyState";

type CardListProps = {
  cardList: CardListType | SearchListType;
};

const CardList: FC<CardListProps> = ({ cardList }) => {
  return cardList.length > 0 ? (
    <div className={styles.cardListWrapper}>
      <div className={styles.wrapper}>
        {cardList.map((item) => {
          return <Card card={item} key={item.id} />;
        })}
      </div>
    </div>
  ) : (
    <EmptyState title="Movie list is empty" />
  );
};

export default CardList;
