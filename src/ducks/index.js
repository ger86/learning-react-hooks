import { combineReducers } from 'redux';
import users from './users';
import security from './security';

const rootReducer = combineReducers({
  users,
  security
});

export default rootReducer;

export * from './selectors';
