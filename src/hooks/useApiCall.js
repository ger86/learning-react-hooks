import { useReducer, useEffect } from 'react';

const FORM_SENDING = 'FORM_SENDING';
const FORM_SEND_FAILED = 'FORM_SEND_FAILED';
const FORM_SEND_SUCCEEDED = 'FORM_SEND_SUCCEEDED';

const initialState = { sending: false, error: null, success: false };

function reducer(state, action) {
  switch (action.type) {
    case FORM_SENDING:
      return { sending: true, error: null, success: false };
    case FORM_SEND_FAILED:
      return { sending: false, error: action.error, success: false };
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

const defaultOptions = { executeOnMount: true };

const normalizeOptions = options => ({
  ...defaultOptions,
  ...options
});

export default function useApiCall(fn, params = [], options) {
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
