import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { logoutAction } from 'ducks/security';
import { loginRoute } from 'config/routes';

const LogoutContainer = ({ logoutActionConnect }) => {
  logoutActionConnect();
  return <Redirect to={loginRoute()} />;
};

LogoutContainer.propTypes = {
  logoutActionConnect: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutActionConnect: logoutAction }
)(LogoutContainer);
