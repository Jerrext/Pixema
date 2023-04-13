import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import {
  logoutUser,
  setInputErrors,
  setLoggedIn,
  setUserData,
  signInUser,
  signUpUser,
} from "../reducers/authSlice";
import {
  Callback,
  SigInPayloadData,
  SignInUserPayload,
  SignUpUserPayload,
} from "../reducers/@types";
import { UserErrorsData, UserResponseData } from "./@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";

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
    localStorage.setItem(ACCESS_TOKEN_KEY, responseData.user.access_token);
    yield put(setUserData(responseData.user));
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

function* logoutUserWorker(action: PayloadAction<Callback>) {
  const callback = action.payload;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  yield put(setUserData(null));
  yield put(setLoggedIn(false));
  callback();
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(logoutUser, logoutUserWorker),
  ]);
}
