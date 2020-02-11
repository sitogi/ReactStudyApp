import { all, fork } from 'redux-saga/effects';

import { watchGetMembers, watchSearchRepositories } from 'sagas/github';
import { watchPrepareCalling } from 'sagas/calling';

export default function* rootSaga() {
  yield all([fork(watchGetMembers), fork(watchSearchRepositories), fork(watchPrepareCalling)]);
}
