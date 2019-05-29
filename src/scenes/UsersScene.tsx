import React from 'react';
import queryString from 'query-string';
import { ReactRouterLocation } from 'types/reactRouterLocation';
import UsersListContainer from 'components/users/UsersListContainer';

export default ({ location }: { location: ReactRouterLocation }) => {
  const values = queryString.parse(location.search);
  return (
    <UsersListContainer
      currentPage={parseInt((values.page as string) || '1', 10)}
    />
  );
};
