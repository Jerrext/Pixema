import React, { useEffect, useMemo, useState } from "react";
import styles from "./SingleMovie.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  MovieSelectors,
  addMovieToList,
  getRecommendationMovieList,
  getSingleMovie,
  removeListItem,
  setRecommendationMovieList,
  setSingleMovie,
} from "src/redux/reducers/movieSlice";
import Loader from "src/components/Loader";
import { useParams } from "react-router-dom";
import GroupButtons from "src/components/GroupButtons";
import classNames from "classnames";
import {
  BookmarkIcon,
  EyeIcon,
  ImdbIcon,
  SocialIcon,
  TrendIcon,
} from "src/assets/icons";
import {
  getMoneyFormat,
  getUkFormatDate,
  getWordWithCapitalLetter,
} from "src/utils/functions";
import Arrow from "src/components/Arrow";
import Card from "src/components/Card";
import Player from "src/components/Player";
import ThumbsGallery from "src/components/ThumbsGallery";
import Tabs from "src/components/Tabs";
import { MovieTabsNames } from "src/utils/@globalTypes";
import ViewPerson from "src/components/ViewPerson";
import { setMessage } from "src/redux/reducers/messageSlice";
import { FullListsPayload } from "src/redux/reducers/@types";
import ListSelect from "src/components/ListSelect";
import EmptyState from "src/components/EmptyState";

const SingleMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [tabState, setTabState] = useState(MovieTabsNames.Images);
  const [savedState, setSavedState] = useState(false);
  const [watchedState, setWatchedState] = useState(false);

  const isSingleMovieLoadng = useSelector(MovieSelectors.getSingleMovieLoadng);
  const movieData = useSelector(MovieSelectors.getSingleMovie);
  const recommendationCardList = useSelector(
    MovieSelectors.getRecommendationMovieList
  );
  const isRecommendationMovieLoading = useSelector(
    MovieSelectors.getRecommendationMovieLoading
  );
  const moviesLists = useSelector(MovieSelectors.getFullMyMoviesLists);

  const filteredMoviesLists = moviesLists.filter(
    (item) => item.title !== "Favorites" && item.title !== "watchlist"
  );
  const favoriteList = moviesLists.find((item) => item.title === "Favorites");
  const favoriteIndex = favoriteList
    ? favoriteList.list.findIndex((movie) => movie.id === movieData?.id)
    : -1;
  const watchedList = moviesLists.find((item) => item.title === "watchlist");
  const watchedIndex = watchedList
    ? watchedList.list.findIndex((movie) => movie.id === movieData?.id)
    : -1;
  const recommendationPageCount = Math.ceil(
    (recommendationCardList.length + 0.001) / 4
  );
  const isTrend = movieData?.rating && +movieData.rating >= 8;
  const isGreen =
    movieData?.rating && +movieData.rating < 8 && +movieData.rating >= 6;
  const isOrange = movieData?.rating && +movieData.rating < 6;
  const emptyValue = "Empty";

  const getCreditsDepartment = (department: string) => {
    const data = movieData?.credits.filter(
      (item) => item.pivot.department === department
    );
    return data?.length !== 0
      ? data?.map((item) => {
          return <ViewPerson key={item.id} personData={item} />;
        })
      : emptyValue;
  };

  const MOVIE_LIST = [
    {
      title: "Year",
      description: movieData?.year ? movieData.year : emptyValue,
    },
    {
      title: "Released",
      description: movieData?.release_date
        ? getUkFormatDate(movieData.release_date)
        : emptyValue,
    },
    {
      title: "Revenue",
      description: movieData?.revenue
        ? getMoneyFormat(movieData?.revenue)
        : emptyValue,
    },
    {
      title: "Budget",
      description: movieData?.budget
        ? getMoneyFormat(movieData?.budget)
        : emptyValue,
    },
    {
      title: "Type",
      description: movieData?.type
        ? getWordWithCapitalLetter(movieData.type)
        : emptyValue,
    },
    {
      title: "Actors",
      description: getCreditsDepartment("cast"),
    },
    {
      title: "Director",
      description: getCreditsDepartment("directing"),
    },
    {
      title: "Writers",
      description: getCreditsDepartment("writing"),
    },
  ];

  const TABS_LIST = [
    {
      title: "Images",
      key: MovieTabsNames.Images,
    },
    {
      title: "Videos",
      key: MovieTabsNames.Videos,
    },
  ];

  const changeList =
    (
      list: FullListsPayload,
      state: boolean,
      setState: React.Dispatch<React.SetStateAction<boolean>>
    ) =>
    () => {
      if (movieData) {
        if (state) {
          dispatch(
            removeListItem({
              id: list.id,
              value: { itemId: movieData.id, itemType: "title" },
            })
          );
        } else {
          dispatch(
            addMovieToList({
              id: list.id,
              value: { itemId: movieData.id, itemType: "title" },
            })
          );
        }
        setState(!state);
      }
    };
  const GROUP_BUTTON_LIST = [
    {
      title: (
        <div
          className={classNames({
            [styles.addedMovie]: savedState,
          })}
        >
          <BookmarkIcon />
        </div>
      ),
      onClick:
        favoriteList && changeList(favoriteList, savedState, setSavedState),
    },
    {
      title: (
        <div
          className={classNames({
            [styles.addedMovie]: watchedState,
          })}
        >
          <EyeIcon />
        </div>
      ),
      onClick:
        watchedList && changeList(watchedList, watchedState, setWatchedState),
    },
    {
      title: <SocialIcon />,
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        dispatch(
          setMessage({ status: true, message: "Link copied to clipboard" })
        );
      },
    },
  ];
  const onTabClick = (key: MovieTabsNames) => setTabState(key);

  const nextPageOnClick = () => {
    currentPage < recommendationPageCount && setCurrentPage(currentPage + 1);
  };

  const previosPageOnClick = () => {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  };

  const recommendationPageList = useMemo(() => {
    return recommendationCardList.filter(
      (item, index) => index >= 4 * (currentPage - 1) && index < 4 * currentPage
    );
  }, [recommendationCardList, currentPage]);

  useEffect(() => {
    if (id) {
      dispatch(getSingleMovie(id));
      dispatch(getRecommendationMovieList(id));
    }
    return () => {
      dispatch(setSingleMovie(null));
      dispatch(setRecommendationMovieList([]));
    };
  }, [id]);

  useEffect(() => {
    setSavedState(favoriteIndex > -1);
  }, [favoriteIndex]);

  useEffect(() => {
    setWatchedState(watchedIndex > -1);
  }, [watchedIndex]);

  return isSingleMovieLoadng ? (
    <Loader />
  ) : (
    <>
      <div className={styles.scrollWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.movieCardWrapper}>
            <div className={styles.movieCard}>
              <img src={movieData?.poster} className={styles.moviePoster}></img>
              <GroupButtons groupButtonsList={GROUP_BUTTON_LIST} />
              {filteredMoviesLists.length !== 0 && (
                <ListSelect
                  title="Lists"
                  lists={filteredMoviesLists}
                  movieId={movieData?.id}
                />
              )}
            </div>
          </div>
          <div className={styles.movieText}>
            <div className={styles.titleWrapper}>
              <div className={styles.genres}>
                {movieData?.genres.map((item) => {
                  return <div key={item.id}>{item.display_name}</div>;
                })}
              </div>
              <h1 className={styles.title}>{movieData?.name}</h1>
            </div>
            <div className={styles.description}>
              <div className={styles.raringWrapper}>
                <div
                  className={classNames(styles.rating, {
                    [styles.trendRating]: isTrend,
                    [styles.greenRating]: isGreen,
                    [styles.orangeRating]: isOrange,
                  })}
                >
                  {isTrend && <TrendIcon />}
                  {movieData?.rating ? movieData.rating : 0}
                </div>
                <div>
                  <ImdbIcon />
                  <p>{movieData?.rating ? movieData.rating : 0}</p>
                </div>
                {movieData?.runtime && <div>{movieData?.runtime} min</div>}
                <div>
                  <EyeIcon />
                  <p>{movieData?.views ? movieData.views : 0}</p>
                </div>
              </div>
              {movieData?.description && <p>{movieData?.description}</p>}
              <div className={styles.movieData}>
                <table className={styles.table}>
                  <tbody>
                    {MOVIE_LIST.map((item, index) => {
                      return (
                        <tr key={item.title + index}>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {movieData && movieData.images.length > 0 && (
              <div className={styles.preview}>
                <h2>Preview</h2>
                <Tabs
                  onClick={onTabClick}
                  activeTab={tabState}
                  tabsList={TABS_LIST}
                />
                {tabState === MovieTabsNames.Videos ? (
                  <ThumbsGallery
                    videos={movieData.videos}
                    activeTab={tabState}
                  />
                ) : (
                  <ThumbsGallery
                    images={movieData.images}
                    activeTab={tabState}
                  />
                )}
              </div>
            )}

            {movieData && (
              <div className={styles.playerWrapper}>
                <h2>Watch online</h2>
                <div className={styles.player}>
                  <Player
                    title={movieData?.original_title}
                    year={movieData?.year}
                  />
                </div>
              </div>
            )}

            <div className={styles.recommendation}>
              <div className={styles.recommendationTop}>
                <h2>Recommendation</h2>
                <div className={styles.buttonsWrapper}>
                  <Arrow
                    onClick={previosPageOnClick}
                    disabled={currentPage === 1}
                  />
                  <Arrow
                    onClick={nextPageOnClick}
                    disabled={currentPage === recommendationPageCount}
                  />
                </div>
              </div>
              {isRecommendationMovieLoading ? (
                <Loader />
              ) : recommendationPageList.length > 0 ? (
                <div className={styles.recommendationCardList}>
                  {recommendationPageList.map((item) => {
                    return (
                      <Card key={item.id} card={item} classname={styles.card} />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <EmptyState title="List of related movies is empty" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
