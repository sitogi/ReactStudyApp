import { Reducer } from 'redux';

import { CallingAction } from 'actions/calling';
import * as ActionType from 'actions/githubConstants';

export interface CallingState {
  isCalling: boolean;
  isCalled: boolean;
  nowCalling: boolean;
  myStream?: MediaStream;
  otherStreams?: MediaStream[];
}

export const initialState: CallingState = {
  isCalling: false,
  isCalled: false,
  nowCalling: false,
  myStream: undefined,
  otherStreams: [],
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
    default: {
      return state;
    }
  }
};

export default callingReducer;
