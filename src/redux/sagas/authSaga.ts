import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import { setRegisterErrors, signUpUser } from "../reducers/authSlice";
import { SignUpUserPayload } from "../reducers/@types";
import { UserErrorsData, UserResponseData } from "./@types";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    data: responseData,
    problem,
    status,
  }: ApiResponse<UserErrorsData | undefined> = yield call(API.signUpUser, data);
  if (responseData && ok) {
    callback();
  } else if (responseData && status === 422) {
    if (responseData.errors) {
      yield put(setRegisterErrors(responseData.errors));
    }
  } else {
    console.warn("Error sign up user", problem);
  }
}

export default function* authSaga() {
  yield all([takeLatest(signUpUser, signUpUserWorker)]);
}
