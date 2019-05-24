import { useReducer, useCallback } from 'react';

export default function useApiCall(apiCall) {
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
        return { sending: false, error: null, success: true };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const memoizedCallback = useCallback(() => {
    const sendApiCall = async () => {
      dispatch({ type: FORM_SENDING });
      try {
        await apiCall();
        dispatch({ type: FORM_SEND_SUCCEEDED });
      } catch (exception) {
        dispatch({ type: FORM_SEND_FAILED, error: exception });
      }
    };
    sendApiCall();
  }, [apiCall]);

  return {
    state,
    apiCall: memoizedCallback
  };
}
