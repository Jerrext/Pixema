import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";

export enum RoutesList {
  Home = "/",
  SignIn = "/sign-in",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.SignIn} element={<SignIn />} />
        <Route path={RoutesList.Home} element={""}>
          <Route path={RoutesList.Home} element={""} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
