import { Reducer } from 'redux';

import { CallingAction } from 'actions/calling';
import * as ActionType from 'actions/githubConstants';

export interface CallingState {
  isCalling: boolean;
  isJoining: boolean;
  roomName: string;
  nowCalling: boolean;
  myStream?: MediaStream;
  remoteStream?: MediaStream;
}

export const initialState: CallingState = {
  isCalling: false,
  isJoining: false,
  roomName: '',
  nowCalling: false,
  myStream: undefined,
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
    case ActionType.JOIN_ROOM_START:
      return {
        ...state,
        roomName: action.payload,
        isJoining: true,
      };
    default: {
      return state;
    }
  }
};

export default callingReducer;
