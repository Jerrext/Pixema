import React, { FC, useState } from "react";
import classNames from "classnames";
import styles from "./ListSelect.module.scss";
import { FullListsPayload } from "src/redux/reducers/@types";
import { CheckMark2Icon } from "src/assets/icons";
import { useDispatch } from "react-redux";
import { addMovieToList, removeListItem } from "src/redux/reducers/movieSlice";

type ListSelectProps = {
  title: string;
  lists: FullListsPayload[];
  movieId?: number;
};

const ListSelect: FC<ListSelectProps> = ({ title, lists, movieId }) => {
  const dispatch = useDispatch();
  const [activeState, setActiveState] = useState(false);

  const changeList = (list: FullListsPayload) => () => {
    if (movieId) {
      if (list.list.findIndex((item) => item.id === movieId) > -1) {
        dispatch(
          removeListItem({
            id: list.id,
            value: { itemId: movieId, itemType: "title" },
          })
        );
      } else {
        dispatch(
          addMovieToList({
            id: list.id,
            value: { itemId: movieId, itemType: "title" },
          })
        );
      }
    }
  };
  return (
    <>
      <div
        className={styles.buttonWrapper}
        onClick={() => setActiveState(!activeState)}
      >
        {title}
      </div>
      <div
        className={classNames(styles.dropDownMenu, {
          [styles.dropDownMenuOpened]: activeState,
        })}
      >
        {lists.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.dropDownBtn}
              onClick={changeList(item)}
            >
              <div>{item.title}</div>
              {item.list.findIndex((item) => item.id === movieId) > -1 && (
                <CheckMark2Icon />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListSelect;
