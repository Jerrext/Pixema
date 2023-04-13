import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import {
  SigInPayloadData,
  SignInUserPayload,
  SignUpUserPayload,
  Callback,
  inputErrorsState,
} from "./@types";
import { UserDataType } from "../sagas/@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";

type AuthState = {
  isLoggedIn: boolean;
  inputErrors: inputErrorsState | null;
  userData: UserDataType | null;
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
    setInputErrors(state, action: PayloadAction<inputErrorsState | null>) {
      state.inputErrors = action.payload;
    },
    signInUser(_, __: PayloadAction<SignInUserPayload>) {},
    setUserData(state, action: PayloadAction<UserDataType | null>) {
      state.userData = action.payload;
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    logoutUser(_, __: PayloadAction<Callback>) {},
  },
});

export const {
  signUpUser,
  signInUser,
  setInputErrors,
  setUserData,
  setLoggedIn,
  logoutUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;
export const authName = AuthSlice.name;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getEmailErrors: (state: RootState) =>
    state.auth.inputErrors?.email && state.auth.inputErrors?.email[0],
  getPasswordErrors: (state: RootState) =>
    state.auth.inputErrors?.password && state.auth.inputErrors?.password[0],
};
