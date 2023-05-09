import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { logoutUser } from "../reducers/authSlice";

function* callCheckingAuth(apiCall: any, token?: string, ...params: any) {
  const accessToken = token ? token : localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    const response: ApiResponse<any> = yield call(
      apiCall,
      accessToken,
      ...params
    );

    if (response.status === 401) {
      yield put(logoutUser());
    }

    return response;
  } else {
    yield put(logoutUser());
  }
}

export default callCheckingAuth;
