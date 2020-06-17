import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";

function* logIn(action) {
  try {
    // call 비동기 fork 동기
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: e,
    });
  }
}

function* logOut() {
  try {
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
    });
  } catch (e) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: e.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
