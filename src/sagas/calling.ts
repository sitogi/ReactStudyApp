// TODO: 仮のコードを書いておくために一時的につけておく。後で消す。
/* eslint-disable @typescript-eslint/no-unused-vars */

import { call, put, take, takeLatest, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Peer, { SfuRoom } from 'skyway-js';

import * as Action from 'actions/githubConstants';
import { CallingAction, callActions, waitCallingActions } from 'actions/calling';

const subscribePeer = (peer: Peer) =>
  eventChannel(emitter => {
    peer.on('open', () => {
      // nothing to do
    });
    peer.on('error', () => {
      // nothing to do
    });
    peer.on('connection', (dataConnection: DataConnection) => {
      // データコネクション受信時の処理
      dataConnection.on('data', ({ roomName }) => {
        console.log(roomName);

        return emitter({ type: Action.JOIN_ROOM_START, payload: roomName });
      });
    });
    peer.on('close', () => {
      // nothing to do
      // return emitter({ type: Action.TAKE_CALLING_START, payload: data });
    });

    // unsubscribe function
    return () => {};
  });

const subscribeCall = (sfuRoom: SfuRoom) =>
  eventChannel(emitter => {
    sfuRoom.on('open', () => {
      console.log('SFU Room に入りました。');
    });

    sfuRoom.on('peerJoin', peerId => {
      console.log(`${peerId} さんが入室しました。`);
    });

    sfuRoom.on('stream', stream => {
      console.log('誰かが Stream を送信しました。');
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
    const sfuRoom: SfuRoom = peer.joinRoom('testRoom', { mode: 'sfu', stream: action.payload.localStream });
    const roomChannel = yield call(subscribeCall, sfuRoom);
    // TODO: P2P でデータ送って伝えるところから
    const dataConnection = peer.connect(action.payload.remotePeerId);
    dataConnection.on('open', () => {
      const data = {
        name: 'SkyWay',
        msg: 'Hello, World!',
      };
      dataConnection.send(data);
    });

    while (true) {
      const callAction: CallingAction = yield take(roomChannel);
      yield put(callAction);
    }
  }
}

export function* callingSaga(callingAction: ReturnType<typeof waitCallingActions.start>) {
  // const { myUserId } = callingAction.payload; // REVISIT: getCurrentUser してもいいのかも
  const randomId = Math.random()
    .toString(32)
    .substring(2);
  console.log(randomId);

  try {
    const peer = new Peer(randomId, { key: `621c5051-ee0c-40f5-bca9-10b536cac06a` }); // TODO
    yield fork(subscribeSaga, peer);
    yield fork(publishSaga, peer);
  } catch (error) {
    // yield put(websocketActions.connectFail(error));
  }
}

export function* watchPrepareCalling() {
  yield takeLatest(Action.WAIT_CALLING_START, callingSaga);
}
