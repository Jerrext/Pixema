import React, { useEffect } from "react";
import styles from "./ListPage.module.scss";
import CardList from "src/components/CardList/";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  setCurrentList,
  setModalWindow,
  setMyMoviesListLoading,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import { useLocation, useParams } from "react-router-dom";
import { EditIcon, TrashCanIcon } from "src/assets/icons";
import { ButtonType, ModalWindowType } from "src/utils/@globalTypes";
import Button from "src/components/Button";

const ListPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();

  const isMyMoviesListLoading = useSelector(
    MovieSelectors.getMyMoviesListLoading
  );
  const fullMoviesLists = useSelector(MovieSelectors.getFullMyMoviesLists);
  const moviesLists = useSelector(MovieSelectors.getMyMoviesLists);

  const filteredListsId = fullMoviesLists
    .filter((item) => item.title !== "Favorites" && item.title !== "watchlist")
    .findIndex((item) => id && item.id === +id);

  const getCurrentList = () => {
    if (fullMoviesLists && id) {
      const list = fullMoviesLists.find((item) => item.id === +id);
      return list ? list.list : [];
    }
    return [];
  };

  const onRemoveListBtnClick = () => {
    dispatch(setModalWindow(ModalWindowType.RemoveList));
  };

  const onEditListBtnClick = () => {};

  useEffect(() => {
    if (moviesLists.length === fullMoviesLists.length) {
      dispatch(setMyMoviesListLoading(false));
    }
  }, [fullMoviesLists, moviesLists]);

  useEffect(() => {
    if (id) {
      const currentList = moviesLists.find((item) => item.id === +id);
      currentList && dispatch(setCurrentList(currentList));
    }
  }, [id, moviesLists]);

  return isMyMoviesListLoading ? (
    <Loader />
  ) : (
    <>
      {filteredListsId > -1 && (
        <div className={styles.listControls}>
          <Button
            title={
              <>
                <span>Remove list</span>
                <TrashCanIcon />
              </>
            }
            onClick={onRemoveListBtnClick}
            type={ButtonType.Secondary}
            className={styles.listBtn}
          />
          <Button
            title={
              <>
                <span>Edit list</span>
                <EditIcon />
              </>
            }
            onClick={onEditListBtnClick}
            type={ButtonType.Secondary}
            className={styles.listBtn}
          />
        </div>
      )}
      <CardList cardList={getCurrentList()} />
    </>
  );
};

export default ListPage;
