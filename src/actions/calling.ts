import * as ActionType from 'actions/githubConstants';

export const waitCallingActions = {
  start: () => ({
    type: ActionType.WAIT_CALLING_START as typeof ActionType.WAIT_CALLING_START,
  }),
};

export const callActions = {
  start: (remotePeerId: string) => ({
    type: ActionType.CALL_START as typeof ActionType.CALL_START,
    payload: { remotePeerId },
  }),
  stop: () => ({
    type: ActionType.CALL_STOP as typeof ActionType.CALL_STOP,
  }),
};

export const joinRoomActions = {
  start: (roomName: string) => ({
    type: ActionType.JOIN_ROOM_START as typeof ActionType.JOIN_ROOM_START,
    payload: roomName,
  }),
};

export const takeCallingActions = {
  start: (uid: string) => ({
    type: ActionType.TAKE_CALLING_START as typeof ActionType.TAKE_CALLING_START,
    payload: uid,
  }),
};

export const updateLocalStream = {
  start: (stream: MediaStream) => ({
    type: ActionType.UPDATE_LOCAL_STREAM_START as typeof ActionType.UPDATE_LOCAL_STREAM_START,
    payload: stream,
  }),
};

export const updateRemoteStream = {
  start: (stream: MediaStream) => ({
    type: ActionType.UPDATE_REMOTE_STREAM_START as typeof ActionType.UPDATE_REMOTE_STREAM_START,
    payload: stream,
  }),
};

export type CallingAction =
  | ReturnType<typeof waitCallingActions.start>
  | ReturnType<typeof callActions.start>
  | ReturnType<typeof callActions.stop>
  | ReturnType<typeof joinRoomActions.start>
  | ReturnType<typeof takeCallingActions.start>
  | ReturnType<typeof updateLocalStream.start>
  | ReturnType<typeof updateRemoteStream.start>;
