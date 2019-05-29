import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUsers, getUser, patchUser, postUser } from 'services/api/users';
import arrayUnique from 'utils/arrayUnique';
import { User } from 'types/User';
import { ApiError } from 'types/ApiError';

const GET_USERS_STARTED = 'GET_USERS_STARTED';
const GET_USERS_SUCCEEDED = 'GET_USERS_SUCCEEDED';
const GET_USERS_FAILED = 'GET_USERS_FAILED';

const GET_USER_SUCCEEDED = 'GET_USER_SUCCEEDED';
const PATCH_USER_SUCCEEDED = 'PATCH_USER_SUCCEEDED';
const POST_USER_SUCCEEDED = 'POST_USER_SUCCEEDED';

interface ByIdState {
  [id: number]: User;
}

type AllIdsState = Array<number>;

export interface FeedState {
  totalItems: number;
  resultsPerPage: number;
  loading: boolean;
  error?: ApiError | null;
}

export interface State {
  allIds: AllIdsState;
  byId: ByIdState;
  feed: {
    feedPages: { [pageNumber: number]: Array<number> };
    feedState: FeedState;
  };
}

const mapUserId = (singleUser: User): number => singleUser.id;

export function getUsersThunk(
  page: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    dispatch(getUsersThunkStarted());
    try {
      const result = await getUsers(page);
      dispatch(getUsersThunkSucceeded(page, result));
      return result;
    } catch (exception) {
      console.log(exception);
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

function getUsersThunkSucceeded(page: string | number, result: Array<User>) {
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

export function getUserThunk(
  userId: string | number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    const result = await getUser(userId);
    dispatch(getUserThunkSucceeded(result.data));
    return result;
  };
}

function getUserThunkSucceeded(user: User) {
  return {
    type: GET_USER_SUCCEEDED,
    user
  };
}

export function patchUserThunk(
  user: User
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    const result = await patchUser(user);
    dispatch(patchUserThunkSucceeded(result));
    return result;
  };
}

function patchUserThunkSucceeded(user: User) {
  return {
    type: PATCH_USER_SUCCEEDED,
    user
  };
}

export function postUserThunk(
  user: User
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
    const result = await postUser(user);
    dispatch(postUserThunkSucceeded(result));
    return result;
  };
}

function postUserThunkSucceeded(user: User) {
  return {
    type: POST_USER_SUCCEEDED,
    user
  };
}

const allIds = (state: AllIdsState = [], action: AnyAction): AllIdsState => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return arrayUnique([...state, ...action.data.map(mapUserId)]);
    case GET_USER_SUCCEEDED:
    case PATCH_USER_SUCCEEDED:
      return arrayUnique([...state, action.user.id]);
    default:
      return state;
  }
};

const byId = (state: ByIdState = {}, action: AnyAction) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        ...action.data.reduce(
          (ac: ByIdState, singleUser: User) =>
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

const feedPages = (
  state: { [pageNumber: number]: Array<number> } = {},
  action: AnyAction
) => {
  switch (action.type) {
    case GET_USERS_SUCCEEDED:
      return {
        ...state,
        [action.page]: action.data.map(mapUserId)
      };
    default:
      return state;
  }
};

const initialFeedState = {
  totalItems: 0,
  resultsPerPage: 0,
  loading: false,
  error: null
};

const feedState = (state: FeedState = initialFeedState, action: AnyAction) => {
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

export const getUserById = (state: State, id: number) => state.byId[id];
export const getAllUsers = (state: State) =>
  state.allIds.map(id => state.byId[id]);
export const getUsersForPage = (state: State, page: number) =>
  state.feed.feedPages[page]
    ? state.feed.feedPages[page].map((id: number) => state.byId[id])
    : null;
export const getUsersFeedState = (state: State) => state.feed.feedState;
