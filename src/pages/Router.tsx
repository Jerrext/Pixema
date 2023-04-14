import React, { useEffect } from "react";

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

export enum RoutesList {
  Home = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ResetPassword = "/reset-password",
  EditProfile = "/edit-profile",
  Settings = "/settings",
  Trends = "/trends",
  Favorites = "/favorites",
  Default = "*",
}

const Router = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo({ id: "me" }));
    }
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route
            path={RoutesList.Home}
            element={
              isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
            }
          />
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
          <Route path={RoutesList.Default} element={"404"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
