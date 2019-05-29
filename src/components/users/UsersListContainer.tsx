import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserList from 'components/users/UserList';
import { usersRoute } from 'config/routes';
import { ReduxState } from "ducks";
import { getUsersThunk, FeedState } from 'ducks/users';
import { getUsersForPage, getUsersFeedState } from 'ducks/selectors';
import { User } from 'types/User';

interface OwnPropsType {
  currentPage: number
}

interface PropsType extends OwnPropsType {
  getUsersThunkConnect: (page: number) => Promise<void>
  feedState: FeedState,
  users: Array<User> | null
}

const generateLinkForPage = (page: string | number): string => usersRoute(page);

const UsersListContainer = ({
  getUsersThunkConnect,
  feedState,
  currentPage = 1,
  users = []
}: PropsType) => {
  useEffect(() => {
    const requestUsers = async () => {
      try {
        await getUsersThunkConnect(currentPage);
      } catch (foo) {}
    };
    requestUsers();
  }, [currentPage, getUsersThunkConnect]);
  return (
    <UserList
      users={users}
      feedState={feedState}
      currentPage={currentPage}
      generateLinkForPage={generateLinkForPage}
    />
  );
};

export default connect(
  (state: ReduxState, ownProps: OwnPropsType) => ({
    users: getUsersForPage(state, ownProps.currentPage),
    feedState: getUsersFeedState(state)
  }),
  { getUsersThunkConnect: getUsersThunk }
)(UsersListContainer);
