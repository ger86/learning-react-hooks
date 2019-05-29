import React from 'react';
import { ReactRouterMatchType } from 'types/reactRouterMatchType';
import UserEditContainer from 'components/users/UserEditContainer';

const UserEditScene = ({ match }: { match: ReactRouterMatchType }) => (
  <UserEditContainer userId={parseInt(match.params.id, 10)} />
);

export default UserEditScene;
