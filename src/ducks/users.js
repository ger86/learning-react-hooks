import { combineReducers } from 'redux';
import arrayUnique from 'utils/arrayUnique';
import { getUsers, getUser, patchUser, postUser } from 'services/api/users';

const GET_USERS_STARTED = 'GET_USERS_STARTED';
const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

const GET_USER_SUCCEEDED = 'GET_USER_SUCCEEDED';
const PATCH_USER_SUCCEEDED = 'PATCH_USER_SUCCEEDED';
const POST_USER_SUCCEEDED = 'POST_USER_SUCCEEDED';

export function getUsersThunk(page) {
  return async dispatch => {
    dispatch(getUsersThunkStarted());
    try {
      const result = await getUsers(page);
      dispatch(getUsersThunkSucceeded(page, result));
      return result;
    } catch (exception) {
      dispatch(getUsersThunkFailed());
      throw exception;
    }
  };
}

function getUsersThunkStarted() {
  return {
    type: GET_USERS_STARTED
  };
}

function getUsersThunkSucceeded(page, result) {
  return {
    type: GET_USERS_SUCCEEDED,
    page,
    ...result
  };
}

function getUsersThunkFailed() {
  return {
    type: GET_USERS_FAILED
  };
}

export function getUserThunk(userId) {
  return async dispatch => {
    const result = await getUser(userId);
    dispatch(getUserThunkSucceeded(result.data));
    return result;
  };
}

function getUserThunkSucceeded(user) {
  return {
    type: GET_USER_SUCCEEDED,
    user
  };
}

export function patchUserThunk(user) {
  return async dispatch => {
    const result = await patchUser(user);
    dispatch(patchUserThunkSucceeded(result));
    return result;
  };
}

function patchUserThunkSucceeded(user) {
  return {
    type: PATCH_USER_SUCCEEDED,
    user
  };
}

export function postUserThunk(user) {
  return async dispatch => {
    const result = await postUser(user);
    dispatch(postUserThunkSucceeded(result));
    return result;
  };
}

function postUserThunkSucceeded(user) {
  return {
    type: POST_USER_SUCCEEDED,
    user
  };
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return arrayUnique([
        ...state,
        ...action.data.map(singleUser => singleUser.id)
      ]);
    case GET_USER_SUCCEEDED:
    case PATCH_USER_SUCCEEDED:
      return arrayUnique([...state, action.user.id]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        ...action.data.reduce(
          (ac, singleUser) =>
            Object.assign({}, ac, { [singleUser.id]: singleUser }),
          {}
        )
      };
    case GET_USER_SUCCEEDED:
    case PATCH_USER_SUCCEEDED:
    case POST_USER_SUCCEEDED:
      return {
        ...state,
        [action.user.id]: action.user
      };
    default:
      return state;
  }
};

const feedPages = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        [action.page]: action.data.map(singleUser => singleUser.id)
      };
    default:
      return state;
  }
};

const feedState = (
  state = { totalItems: 0, resultsPerPage: 0, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        totalItems: action.total,
        resultsPerPage: action.per_page,
        loading: false,
        error: null
      };
    case GET_USERS_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  feed: combineReducers({ feedPages, feedState })
});

export const getUserById = (state, id) => state.byId[id];
export const getAllUsers = state => state.allIds.map(id => state.byId[id]);
export const getUsersForPage = (state, page) =>
  state.feed.feedPages[page]
    ? state.feed.feedPages[page].map(id => state.byId[id])
    : null;
export const getUsersFeedState = state => state.feed.feedState;
