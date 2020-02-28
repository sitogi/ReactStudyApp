import { Reducer } from 'redux';

import { CallingAction } from 'actions/calling';
import * as ActionType from 'actions/githubConstants';

export interface CallingState {
  peerId: string;
  isCalling: boolean;
  isJoining: boolean;
  roomName: string;
  nowCalling: boolean;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

export const initialState: CallingState = {
  peerId: '',
  isCalling: false,
  isJoining: false,
  roomName: '',
  nowCalling: false,
  localStream: undefined,
  remoteStream: undefined,
};

const callingReducer: Reducer<CallingState, CallingAction> = (
  state: CallingState = initialState,
  action: CallingAction,
): CallingState => {
  switch (action.type) {
    case ActionType.CALL_START:
      return {
        ...state,
        isCalling: true,
      };
    case ActionType.CALL_STOP: {
      const tracks = state.localStream?.getTracks();
      if (tracks !== undefined) {
        tracks.forEach(track => track.stop());
      }

      return {
        ...state,
        isCalling: false,
        isJoining: false,
        roomName: '',
        nowCalling: false,
        localStream: undefined,
        remoteStream: undefined,
      };
    }
    case ActionType.JOIN_ROOM_START:
      return {
        ...state,
        roomName: action.payload,
        isJoining: true,
      };
    case ActionType.UPDATE_PEER_ID_START:
      return {
        ...state,
        peerId: action.payload.peerId,
      };
    case ActionType.UPDATE_LOCAL_STREAM_START:
      return {
        ...state,
        localStream: action.payload,
      };
    case ActionType.UPDATE_REMOTE_STREAM_START:
      return {
        ...state,
        remoteStream: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default callingReducer;
