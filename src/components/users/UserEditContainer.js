import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from 'components/styled/Alert';
import Loading from 'components/common/Loading';
import UserFormContainer from 'components/users/UserFormContainer';
import { getUserThunk, patchUserThunk } from 'ducks/users';
import { getUserById } from 'ducks/selectors';
import useApiCall from 'hooks/useApiCall';
import userPropType from 'prop-types/userPropType';

const UserEditContainer = ({
  userId,
  getUserThunkConnect,
  patchUserThunkConnect,
  user
}) => {
  const { state: apiCallState } = useApiCall(getUserThunkConnect, [userId]);

  const onSubmit = async userData => patchUserThunkConnect(userData);

  if (apiCallState.error) {
    return (
      <Alert error>
        {apiCallState.error.code === 404
          ? 'No se encontró el usuario'
          : apiCallState.error.message}
      </Alert>
    );
  } else if (apiCallState.sending) {
    return <Loading>Cargando usuario</Loading>;
  }
  return <UserFormContainer user={user} sendForm={onSubmit} />;
};

UserEditContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  getUserThunkConnect: PropTypes.func.isRequired,
  patchUserThunkConnect: PropTypes.func.isRequired,
  user: userPropType
};

UserEditContainer.defaultProps = {
  user: null
};

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk, patchUserThunkConnect: patchUserThunk }
)(UserEditContainer);
