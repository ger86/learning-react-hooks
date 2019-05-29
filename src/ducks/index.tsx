import { combineReducers } from 'redux';
import users, { State as UsersState } from './users';
import security, { State as SecurityState } from './security';

export interface ReduxState {
  users: UsersState;
  security: SecurityState;
}

const rootReducer = combineReducers({
  users,
  security
});

export default rootReducer;

export * from './selectors';
