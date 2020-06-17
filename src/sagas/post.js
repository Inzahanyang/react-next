const { delay, takeLatest, all, fork } = require("redux-saga/effects");

function* addPost() {
  try {
    // const result = yield call(logInAPI);
    delay(2000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: e.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
