import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usersRoute } from 'config/routes';
import { isAuthenticated } from 'ducks/selectors';

// eslint-disable-next-line no-shadow
const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={usersRoute()} />
      )
    }
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

PublicRoute.defaultProps = {
  isAuthenticated: false
};

export default connect(state => ({
  isAuthenticated: isAuthenticated(state)
}))(PublicRoute);
