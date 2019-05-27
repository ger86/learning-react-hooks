// @flow
import React from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import type { ReactRouterLocation } from 'types/reactRouterLocation';
import UsersListContainer from 'components/users/UsersListContainer';

export default withRouter(({ location }: { location: ReactRouterLocation }) => {
  const values = queryString.parse(location.search);
  return <UsersListContainer currentPage={values.page || '1'} />;
});
