import React from "react";
import Router from "src/pages/Router";
import ThemeProvider from "./Context/Theme/Provider";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSelectors, changeTheme } from "./redux/reducers/themeSlice";
import { Theme } from "./Context/Theme/Context";

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector(ThemeSelectors.getThemeValue);

  const onChangeTheme = (value: Theme) => {
    dispatch(changeTheme(value));
  };

  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
