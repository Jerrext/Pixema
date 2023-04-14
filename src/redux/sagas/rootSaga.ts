import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import movieSaga from "./movieSaga";
// import postsSaga from "./postsSaga";

export default function* rootSaga() {
  yield all([authSaga(), movieSaga()]);
}
