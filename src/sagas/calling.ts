// TODO: 仮のコードを書いておくために一時的につけておく。後で消す。
/* eslint-disable @typescript-eslint/no-unused-vars */

import { call, put, take, takeLatest, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Peer, { MediaConnection } from 'skyway-js';

import * as Action from 'actions/githubConstants';
import { CallingAction, callActions } from 'actions/calling';

const subscribePeer = (peer: Peer) =>
  eventChannel(emitter => {
    peer.on('open', () => {
      // nothing to do
    });
    peer.on('error', () => {
      // nothing to do
    });
    peer.on('call', (conn: MediaConnection) => {
      // 着信時の処理
      // return emitter({ type: Action.TAKE_CALLING_START, payload: data });
    });
    peer.on('close', () => {
      // nothing to do
      // return emitter({ type: Action.TAKE_CALLING_START, payload: data });
    });

    // unsubscribe function
    return () => {};
  });

const subscribeCall = (mediaConn: MediaConnection) =>
  eventChannel(emitter => {
    mediaConn.on('stream', stream => {
      // 繋がった時の処理。 stream は相手の MediaStream
      // addVideo(call,stream);
      // console.log('かけました call back');
      // setupEndCallUI();
      // $('#their-id').text(call.remoteId);
    });

    mediaConn.on('close', () => {
      // 切れたときの処理。画面を戻す Action を発行すればよいはず
      // removeVideo(call.remoteId);
      // setupMakeCallUI();
    });

    // unsubscribe function
    return () => {};
  });

function* subscribeSaga(peer: Peer) {
  const peerChannel = yield call(subscribePeer, peer);
  while (true) {
    const action: CallingAction = yield take(peerChannel);
    yield put(action);
  }
}

function* publishSaga(peer: Peer) {
  while (true) {
    const action = yield take(Action.CALL_START);
    const mediaConnection = peer.call(action.payload.callToUserId, action.payload.localStream);
    const callChannel = yield call(subscribeCall, mediaConnection);
    while (true) {
      const callAction: CallingAction = yield take(callChannel);
      yield put(callAction);
    }
  }
}

export function* callingSaga(callingAction: ReturnType<typeof callActions.start>) {
  const myUserId = callingAction.payload; // REVISIT: getCurrentUser してもいいのかも

  try {
    const peer = new Peer(myUserId, { key: `621c5051-ee0c-40f5-bca9-10b536cac06a` }); // TODO
    yield fork(subscribeSaga, peer);
    yield fork(publishSaga, peer);
  } catch (error) {
    // yield put(websocketActions.connectFail(error));
  }
}

export function* watchPrepareCalling() {
  yield takeLatest(Action.WAIT_CALLING_START, callingSaga);
}
