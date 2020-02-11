import { combineReducers } from 'redux';

import gitHubReducer from 'reducers/github';
import callingReducer from 'reducers/calling';

const rootReducer = combineReducers({
  gitHub: gitHubReducer,
  calling: callingReducer,
});

export default rootReducer;
