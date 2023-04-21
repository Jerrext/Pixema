import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { authName } from "./reducers/authSlice";
import movieReducer, { movieName } from "./reducers/movieSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas/rootSaga";
import messageReducer, { messageName } from "./reducers/messageSlice";

// import themeReducer, { themeName } from "./reducers/themeSlice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  [messageName]: messageReducer,
  [authName]: authReducer,
  [movieName]: movieReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
