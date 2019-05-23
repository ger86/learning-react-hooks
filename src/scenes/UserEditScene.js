import React from 'react';
import PropTypes from 'prop-types';
import UserEditContainer from 'components/users/UserEditContainer';

const UserEditScene = ({ match }) => (
  <UserEditContainer userId={match.params.id} />
);

UserEditScene.propTypes = {
  match: PropTypes.object.isRequired
};

export default UserEditScene;
