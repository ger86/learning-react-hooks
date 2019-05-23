import getUserInfoFromFacebook from 'services/getUserInfoFromFacebook';

const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
const LOGOUT = 'LOGOUT';

export function facebookLoginThunk() {
  return async dispatch => {
    window.FB.login(
      response => {
        const getUser = async () => {
          const me = await getUserInfoFromFacebook(
            'name,email,picture.width(500).height(500)'
          );
          const user = {
            ...me,
            accessToken: response.authResponse.accessToken
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

export function logoutAction() {
  return {
    type: LOGOUT
  };
}

function loginSucceeded(user) {
  return {
    type: LOGIN_SUCCEEDED,
    user
  };
}

export default (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return { ...state, user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const getCurrentUser = state => state.user;
export const isAuthenticated = state => state.user !== null;
