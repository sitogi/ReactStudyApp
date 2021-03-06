// REVISIT: 可読性のために一時的につけておく。後で消す。
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { call, put, take, takeLatest, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Peer, { SfuRoom } from 'skyway-js';

import * as Action from 'actions/githubConstants';
import { CallingAction, waitCallingActions, updatePeerId } from 'actions/calling';

async function getLocalDisplayStream() {
  const { mediaDevices }: any = navigator; // eslint-disable-line @typescript-eslint/no-explicit-any
  const stream = await mediaDevices.getDisplayMedia({ audio: true, video: true });

  return stream;
}

const subscribePeer = (peer: Peer) =>
  eventChannel(emitter => {
    peer.on('open', () => {});
    peer.on('error', () => {});

    peer.on('connection', (dataConnection: DataConnection) => {
      dataConnection.on('data', ({ roomName }) => {
        console.log(roomName);
        emitter({ type: Action.JOIN_ROOM_START, payload: roomName });
      });
    });

    peer.on('close', () => {});

    // unsubscribe function
    return () => {};
  });

const subscribeRoom = (room: SfuRoom) =>
  eventChannel(emitter => {
    room.on('open', () => {
      console.log('SFU Room に入りました。');
      console.log(room.name);
    });
    room.on('peerJoin', peerId => console.log(`${peerId} さんが入室しました。`));
    room.on('peerLeave', peerId => {
      console.log(`${peerId} さんが退出しました。`);
      if (room.members.length === 0) {
        console.log('一人になったので退出します。');
        emitter({ type: Action.CALL_STOP });
      }
    });
    room.on('stream', stream => {
      console.log(`${stream.id} さんが Stream を送信しました。`);
      emitter({ type: Action.UPDATE_REMOTE_STREAM_START, payload: stream });
    });

    // unsubscribe function
    return () => {};
  });

function* observeRoomEvents(room: SfuRoom) {
  const roomChannel = yield call(subscribeRoom, room);
  while (true) {
    const action: CallingAction = yield take(roomChannel);
    yield put(action);
  }
}

function* observeCallStopAction(room: SfuRoom) {
  const action = yield take(Action.CALL_STOP);
  room.close();
  yield put(action);
}

function* observeCallStartAction(peer: Peer) {
  while (true) {
    const action = yield take(Action.CALL_START);

    const localStream = yield call(getLocalDisplayStream);

    const roomName = `room_of_${peer.id}`;
    const room: SfuRoom = peer.joinRoom(roomName, { mode: 'sfu', stream: localStream });
    yield put({ type: Action.UPDATE_LOCAL_STREAM_START, payload: localStream });

    yield fork(observeRoomEvents, room);
    yield fork(observeCallStopAction, room);

    const dataConnection = peer.connect(action.payload.remotePeerId);
    dataConnection.on('open', () => {
      const data = { roomName };
      dataConnection.send(data);
    });
  }
}

function* subscribeSaga(peer: Peer) {
  const peerChannel = yield call(subscribePeer, peer);
  while (true) {
    const action: CallingAction = yield take(peerChannel);
    if (action.type === Action.JOIN_ROOM_START) {
      const localStream = yield call(getLocalDisplayStream);

      const room: SfuRoom = peer.joinRoom(action.payload, { mode: 'sfu', stream: localStream });
      yield put({ type: Action.UPDATE_LOCAL_STREAM_START, payload: localStream });

      yield fork(observeRoomEvents, room);
      yield fork(observeCallStopAction, room);
    } else {
      yield put(action);
    }
  }
}

export function* callingSaga(callingAction: ReturnType<typeof waitCallingActions.start>) {
  const randomId = Math.random()
    .toString(32)
    .substring(2);

  try {
    const peer = new Peer(randomId, { key: `621c5051-ee0c-40f5-bca9-10b536cac06a` });
    yield put(updatePeerId.start(randomId));
    yield fork(subscribeSaga, peer);
    yield fork(observeCallStartAction, peer);
  } catch (error) {
    // yield put(websocketActions.connectFail(error));
  }
}

export function* watchPrepareCalling() {
  yield takeLatest(Action.WAIT_CALLING_START, callingSaga);
}
