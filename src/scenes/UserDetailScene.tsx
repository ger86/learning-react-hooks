import React from 'react';
import { ReactRouterMatchType } from 'types/reactRouterMatchType';
import UserDetailContainer from 'components/users/UserDetailContainer';

const UserDetailScene = ({ match }: { match: ReactRouterMatchType }) => (
  <UserDetailContainer userId={parseInt(match.params.id, 10)} />
);

export default UserDetailScene;
