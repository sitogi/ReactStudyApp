import * as ActionType from 'actions/githubConstants';

export const waitCallingActions = {
  start: () => ({
    type: ActionType.WAIT_CALLING_START,
  }),
};

export const callActions = {
  start: (uid: string) => ({
    type: ActionType.CALL_START,
    payload: uid,
  }),
};

export const takeCallingActions = {
  start: (uid: string) => ({
    type: ActionType.TAKE_CALLING_START,
    payload: uid,
  }),
};

export type CallingAction =
  | ReturnType<typeof waitCallingActions.start>
  | ReturnType<typeof callActions.start>
  | ReturnType<typeof takeCallingActions.start>;
