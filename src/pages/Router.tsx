import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./FormPages/SignIn";
import PagesContainer from "./PagesContainer";
import SignUp from "./FormPages/SignUp";

export enum RoutesList {
  Home = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ResetPassword = "/reset-password",
  EditProfile = "/edit-profile",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route
            path={RoutesList.Home}
            element={isLoggedIn ? "" : <Navigate to={RoutesList.SignIn} />}
          />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.Default} element={"404"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
