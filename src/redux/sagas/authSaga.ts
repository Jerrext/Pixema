import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import {
  getUserInfo,
  logoutUser,
  setInputErrors,
  setLoggedIn,
  setUserData,
  signInUser,
  signUpUser,
} from "../reducers/authSlice";
import {
  Callback,
  GetUserDataPayload,
  SigInPayloadData,
  SignInUserPayload,
  SignUpUserPayload,
} from "../reducers/@types";
import { UserErrorsData, UserResponseData } from "./@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import callCheckingAuth from "./callCheckingAuth";
import { setAllMoviesLoading } from "../reducers/movieSlice";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    data: responseData,
    problem,
    status,
  }: ApiResponse<UserErrorsData> = yield call(API.signUpUser, data);
  if (responseData && ok) {
    callback();
  } else if (responseData && status === 422) {
    if (responseData.errors) {
      yield put(setInputErrors(responseData.errors));
    }
  } else {
    console.warn("Error sign up user", problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    data: responseData,
    problem,
    status,
  }: ApiResponse<any> = yield call(API.signInUser, data); //
  if (responseData && ok) {
    const token = responseData.user.access_token.split("|")[1];
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    yield put(setLoggedIn(true));
    callback();
  } else if (responseData && status === 422) {
    if (responseData.errors) {
      yield put(setInputErrors(responseData.errors));
    }
  } else {
    console.warn("Error sign in user", problem);
  }
}

function* logoutUserWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  yield put(setLoggedIn(false));
  yield put(setUserData(null));
}

function* getUserDataWorker(action: PayloadAction<GetUserDataPayload>) {
  const { id } = action.payload;
  const { ok, data, problem }: ApiResponse<UserResponseData> =
    yield callCheckingAuth(API.getUserData, id);
  if (data && ok) {
    yield put(setUserData(data.user));
  } else {
    console.warn("Error getting user data", problem);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(logoutUser, logoutUserWorker),
    takeLatest(getUserInfo, getUserDataWorker),
  ]);
}
