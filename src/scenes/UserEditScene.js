// @flow
import React from 'react';
import type { ReactRouterMatchType } from 'types/reactRouterMatchType';
import UserEditContainer from 'components/users/UserEditContainer';

const UserEditScene = ({ match }: { match: ReactRouterMatchType }) => (
  <UserEditContainer userId={match.params.id} />
);

export default UserEditScene;
