import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../store";
import { SignUpUserPayload } from "./@types";

type AuthState = {
  isLoggedIn: boolean;
  registerErrors: registerErrorsState | null;
};

type registerErrorsState = {
  email?: string[];
  password?: string[];
};

const initialState: AuthState = {
  isLoggedIn: false,
  registerErrors: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser(_, __: PayloadAction<SignUpUserPayload>) {},
    setRegisterErrors(
      state,
      action: PayloadAction<registerErrorsState | null>
    ) {
      state.registerErrors = action.payload;
    },
    signInUser(_, __: PayloadAction<undefined>) {},
  },
});

export const { signUpUser, signInUser, setRegisterErrors } = AuthSlice.actions;

export default AuthSlice.reducer;
export const authName = AuthSlice.name;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getEmailErrors: (state: RootState) =>
    state.auth.registerErrors?.email && state.auth.registerErrors?.email[0],
  getPasswordErrors: (state: RootState) =>
    state.auth.registerErrors?.password &&
    state.auth.registerErrors?.password[0],
};
