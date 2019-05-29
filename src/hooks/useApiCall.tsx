import { useReducer, useEffect } from 'react';
import { AnyAction } from "redux";
import { ApiError } from 'types/ApiError';

const FORM_SENDING = 'FORM_SENDING';
const FORM_SEND_FAILED = 'FORM_SEND_FAILED';
const FORM_SEND_SUCCEEDED = 'FORM_SEND_SUCCEEDED';

export interface State {
  sending: boolean;
  success: boolean;
  error: ApiError | null;
  result?: {} | null;
}

interface Options {
  executeOnMount: boolean;
}

export type ApiCallFn = (...nums: Array<any>) => Promise<any>;

const initialState = {
  sending: false,
  error: null,
  success: false,
  result: null
};
const defaultOptions = { executeOnMount: true };

function reducer(state: State, action: AnyAction): State {
  switch (action.type) {
    case FORM_SENDING:
      return { ...state, ...{ sending: true, error: null, success: false } };
    case FORM_SEND_FAILED:
      return {
        sending: false,
        error: action.error,
        success: false,
        result: null
      };
    case FORM_SEND_SUCCEEDED:
      return {
        sending: false,
        error: null,
        success: true,
        result: action.result
      };
    default:
      throw new Error();
  }
}

function normalizeOptions(options?: Options): Options {
  return {
    ...defaultOptions,
    ...options
  };
}

export default function useApiCall(
  fn: ApiCallFn,
  params: Array<any> = [],
  options?: Options
) {
  const mergedOptions = normalizeOptions(options);
  const [state, dispatch] = useReducer(reducer, initialState);
  const executeApiCall = async () => {
    dispatch({ type: FORM_SENDING });
    try {
      const result = await fn(...params);
      dispatch({ type: FORM_SEND_SUCCEEDED, result });
    } catch (exception) {
      dispatch({ type: FORM_SEND_FAILED, error: exception });
    }
  };

  const { executeOnMount } = mergedOptions;
  useEffect(() => {
    if (executeOnMount) {
      executeApiCall();
    }
    // eslint-disable-next-line
  }, params);

  return {
    state,
    execute: () => executeApiCall()
  };
}
