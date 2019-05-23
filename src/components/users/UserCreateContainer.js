import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserFormContainer from 'components/users/UserFormContainer';
import { postUserThunk } from 'ducks/users';

const UserCreateContainer = ({ postUserThunkConnect }) => {
  // eslint-disable-next-line react/destructuring-assignment
  const onSubmit = async user => postUserThunkConnect(user);

  return <UserFormContainer onSubmit={onSubmit} />;
};

UserCreateContainer.propTypes = {
  postUserThunkConnect: PropTypes.func.isRequired
};

export default connect(
  null,
  { postUserThunkConnect: postUserThunk }
)(UserCreateContainer);
