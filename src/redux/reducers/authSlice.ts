import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import {
  SigInPayloadData,
  SignInUserPayload,
  SignUpUserPayload,
  Callback,
  InputErrorsData,
  GetUserDataPayload,
} from "./@types";
import { UserData, UserSignInData } from "../sagas/@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";

type AuthState = {
  isLoggedIn: boolean;
  inputErrors: InputErrorsData | null;
  userData: UserData | null;
};

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  inputErrors: null,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser(_, __: PayloadAction<SignUpUserPayload>) {},
    setInputErrors(state, action: PayloadAction<InputErrorsData | null>) {
      state.inputErrors = action.payload;
    },
    signInUser(_, __: PayloadAction<SignInUserPayload>) {},
    setUserData(state, action: PayloadAction<UserData | null>) {
      state.userData = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    logoutUser(_, __: PayloadAction<undefined>) {},
    getUserInfo(_, __: PayloadAction<GetUserDataPayload>) {},
  },
});

export const {
  signUpUser,
  signInUser,
  setInputErrors,
  setUserData,
  setLoggedIn,
  logoutUser,
  getUserInfo,
} = AuthSlice.actions;

export default AuthSlice.reducer;
export const authName = AuthSlice.name;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getEmailErrors: (state: RootState) =>
    state.auth.inputErrors?.email && state.auth.inputErrors?.email[0],
  getPasswordErrors: (state: RootState) =>
    state.auth.inputErrors?.password && state.auth.inputErrors?.password[0],
  getUserData: (state: RootState) => state.auth.userData,
};
