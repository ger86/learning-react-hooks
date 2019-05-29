import React from 'react';
import { connect } from 'react-redux';
import { RouteProps, RouteComponentProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { loginRoute } from 'config/routes';
import { ReduxState } from 'ducks';
import { isAuthenticated } from 'ducks/selectors';

type Props = {
  component: React.ComponentType<RouteComponentProps>;
  isAuthenticated: boolean;
} & RouteProps;

const PrivateRoute: React.FunctionComponent<Props> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={loginRoute()} />
      )
    }
  />
);

export default connect((state: ReduxState) => ({
  isAuthenticated: isAuthenticated(state)
}))(PrivateRoute);
