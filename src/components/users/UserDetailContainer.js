import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetail from 'components/users/UserDetail';
import { getUserThunk } from 'ducks/users';
import { getUserById } from 'ducks/selectors';
import useApiCall from 'hooks/useApiCall';
import userPropType from 'prop-types/userPropType';

const UserDetailContainer = ({ getUserThunkConnect, user, userId }) => {
  const memoizedCallback = useCallback(() => {
    getUserThunkConnect(userId);
  }, [userId, getUserThunkConnect]);

  const { state: apiCallState, apiCall } = useApiCall(memoizedCallback);
  useEffect(() => {
    apiCall();
  }, [userId, apiCall]);

  return <UserDetail user={user} state={apiCallState} />;
};

UserDetailContainer.propTypes = {
  getUserThunkConnect: PropTypes.func.isRequired,
  user: userPropType,
  userId: PropTypes.string.isRequired
};

UserDetailContainer.defaultProps = {
  user: null
};

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk }
)(UserDetailContainer);
