import React, { ReactNode, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignIn from "./FormPages/SignIn";
import PagesContainer from "./PagesContainer";
import SignUp from "./FormPages/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import ListPage from "./ListPage";
import {
  MovieSelectors,
  getMyMoviesLists,
} from "src/redux/reducers/movieSlice";
import Settings from "./Settings/Settings";
import { changeTheme } from "src/redux/reducers/themeSlice";
import { THEME } from "src/utils/constants";
import { Theme } from "src/Context/Theme/Context";
import Trends from "./Trends";
import Search from "./Search";
import Filters from "./Filters";
import NotFound from "./NotFound/NotFound";

export enum RoutesList {
  Home = "/",
  Browse = "/home/:pageUrl",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ResetPassword = "/reset-password",
  Settings = "/settings",
  Trends = "/trends",
  Lists = "/lists/:id",
  SingleMovie = "/titles/:id",
  SearchMovie = "/search/:query",
  Filters = "/filters/:filters",
  Default = "*",
}

const Router = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const redirectSignIn = (page: ReactNode) => {
    return isLoggedIn ? page : <Navigate to={RoutesList.SignIn} />;
  };

  useEffect(() => {
    if (localStorage.getItem(THEME)) {
      dispatch(
        changeTheme(
          localStorage.getItem(THEME) === "dark" ? Theme.Dark : Theme.Light
        )
      );
    } else {
      localStorage.setItem(THEME, Theme.Dark);
    }
    if (isLoggedIn) {
      dispatch(getUserInfo({ id: "me" }));
      dispatch(getMyMoviesLists());
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route
            path={RoutesList.Home}
            element={<Navigate to={"/home/page=1"} />}
          />
          <Route path={RoutesList.Browse} element={redirectSignIn(<Home />)} />

          <Route
            path={RoutesList.SignIn}
            element={
              isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignIn />
            }
          />
          <Route
            path={RoutesList.SignUp}
            element={
              isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignUp />
            }
          />
          <Route
            path={RoutesList.Filters}
            element={redirectSignIn(<Filters />)}
          />
          <Route
            path={RoutesList.Trends}
            element={redirectSignIn(<Trends />)}
          />
          <Route
            path={RoutesList.SingleMovie}
            element={redirectSignIn(<SingleMovie />)}
          />
          <Route
            path={RoutesList.Lists}
            element={redirectSignIn(<ListPage />)}
          />
          <Route
            path={RoutesList.Settings}
            element={redirectSignIn(<Settings />)}
          />
          <Route
            path={RoutesList.SearchMovie}
            element={redirectSignIn(<Search />)}
          />
        </Route>
        <Route path={RoutesList.Default} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
