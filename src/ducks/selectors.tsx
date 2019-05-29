import * as fromUsers from './users';
import * as fromSecurity from './security';
import { ReduxState } from './index';

export const getAllUsers = (state: ReduxState) =>
  fromUsers.getAllUsers(state.users);
export const getUserById = (state: ReduxState, id: number) =>
  fromUsers.getUserById(state.users, id);
export const getUsersForPage = (state: ReduxState, page: number) =>
  fromUsers.getUsersForPage(state.users, page);
export const getUsersFeedState = (state: ReduxState) =>
  fromUsers.getUsersFeedState(state.users);

export const getCurrentUser = (state: ReduxState) =>
  fromSecurity.getCurrentUser(state.security);
export const isAuthenticated = (state: ReduxState) =>
  fromSecurity.isAuthenticated(state.security);
