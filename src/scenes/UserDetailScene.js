// @flow
import React from 'react';
import type { ReactRouterMatchType } from 'types/reactRouterMatchType';
import UserDetailContainer from 'components/users/UserDetailContainer';

const UserDetailScene = ({ match }: { match: ReactRouterMatchType }) => {
  return <UserDetailContainer userId={match.params.id} />;
};

export default UserDetailScene;
