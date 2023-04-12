import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./FormPages/SignIn";
import PagesContainer from "./PagesContainer/PagesContainer";

export enum RoutesList {
  Home = "/",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  ResetPassword = "/reset-password",
  EditProfile = "/edit-profile",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={""} />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
