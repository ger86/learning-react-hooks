import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import getUserInfoFromFacebook from 'services/getUserInfoFromFacebook';
import { FacebookUser } from 'types/FacebookUser';

const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
const LOGOUT = 'LOGOUT';

export interface State {
  user: FacebookUser | null;
}

export function facebookLoginThunk() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    window.FB.login(
      (response: any) => {
        const getUser = async () => {
          const me: FacebookUser = await getUserInfoFromFacebook(
            'name,email,picture.width(500).height(500)'
          );
          const user: FacebookUser = {
            ...me,
            accessToken: response.authResponse.accessToken as string
          };
          return dispatch(loginSucceeded(user));
        };

        if (response.status === 'connected') {
          getUser();
        } else {
          throw new Error('cannot login');
        }
      },
      { scope: 'public_profile,email' }
    );
  };
}

export function logoutAction(): AnyAction {
  return {
    type: LOGOUT
  };
}

function loginSucceeded(user: FacebookUser): AnyAction {
  return {
    type: LOGIN_SUCCEEDED,
    user
  };
}

export default (state: State = { user: null }, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return { ...state, user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const getCurrentUser = (state: State): FacebookUser | null =>
  state.user;
export const isAuthenticated = (state: State): boolean =>
  state.user !== null;
