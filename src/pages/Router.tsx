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
import Home from "./Home/Home";
import SingleMovie from "./SingleMovie";
import Favorites from "./Favorites/Favorites";
import {
  MovieSelectors,
  getMyMoviesLists,
  // getFavoriteMovies,
} from "src/redux/reducers/movieSlice";
import Settings from "./Settings/Settings";
import { changeTheme } from "src/redux/reducers/themeSlice";
import { THEME } from "src/utils/constants";
import { Theme } from "src/Context/Theme/Context";

export enum RoutesList {
  Home = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ResetPassword = "/reset-password",
  EditProfile = "/edit-profile",
  Settings = "/settings",
  Trends = "/trends",
  Favorites = "/favorites",
  SingleMovie = "/titles/:id",
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
          <Route path={RoutesList.Home} element={redirectSignIn(<Home />)} />
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
            path={RoutesList.SingleMovie}
            element={redirectSignIn(<SingleMovie />)}
          />
          <Route
            path={RoutesList.Favorites}
            element={redirectSignIn(<Favorites />)}
          />
          <Route
            path={RoutesList.Settings}
            element={redirectSignIn(<Settings />)}
          />
          <Route path={RoutesList.Default} element={"404"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
