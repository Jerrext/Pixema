import React from "react";
import { RootState } from "../store";
import { Theme } from "src/Context/Theme/Context";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeValue: Theme.Dark,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.themeValue = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
export const themeName = themeSlice.name;

export const ThemeSelectors = {
  getThemeValue: (state: RootState) => state.theme.themeValue,
};
