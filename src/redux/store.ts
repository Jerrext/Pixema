import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import themeReducer, { themeName } from "./reducers/themeSlice";

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
