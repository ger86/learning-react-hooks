import React from 'react';
import PropTypes from 'prop-types';
import UserDetailContainer from 'components/users/UserDetailContainer';

const UserDetailScene = ({ match }) => {
  return <UserDetailContainer userId={match.params.id} />;
};

UserDetailScene.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserDetailScene;
