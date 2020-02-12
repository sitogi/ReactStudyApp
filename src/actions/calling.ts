import * as ActionType from 'actions/githubConstants';

export const waitCallingActions = {
  start: () => ({
    type: ActionType.WAIT_CALLING_START as typeof ActionType.WAIT_CALLING_START,
  }),
};

export const callActions = {
  start: (remotePeerId: string, localStream: MediaStream) => ({
    type: ActionType.CALL_START as typeof ActionType.CALL_START,
    payload: { remotePeerId, localStream },
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

export type CallingAction =
  | ReturnType<typeof waitCallingActions.start>
  | ReturnType<typeof callActions.start>
  | ReturnType<typeof joinRoomActions.start>
  | ReturnType<typeof takeCallingActions.start>;
