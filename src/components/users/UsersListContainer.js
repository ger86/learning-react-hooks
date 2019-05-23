import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsersThunk } from 'ducks/users';
import UserList from 'components/users/UserList';
import { getUsersForPage, getUsersFeedState } from 'ducks/selectors';
import userPropType from 'prop-types/userPropType';
import { usersRoute } from 'config/routes';

const generateLinkForPage = page => usersRoute(page);

const UsersListContainer = ({
  getUsersThunkConnect,
  feedState,
  currentPage,
  users
}) => {
  useEffect(() => {
    const requestUsers = async () => {
      try {
        await getUsersThunkConnect(currentPage);
        // eslint-disable-next-line no-empty
      } catch (foo) {}
    };
    requestUsers();
  }, [currentPage, getUsersThunkConnect]);
  return (
    <UserList
      users={users}
      feedState={feedState}
      currentPage={parseInt(currentPage, 10)}
      generateLinkForPage={generateLinkForPage}
    />
  );
};

UsersListContainer.propTypes = {
  getUsersThunkConnect: PropTypes.func.isRequired,
  feedState: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(userPropType),
  currentPage: PropTypes.string
};

UsersListContainer.defaultProps = {
  currentPage: '1',
  users: []
};

export default connect(
  (state, ownProps) => ({
    users: getUsersForPage(state, ownProps.currentPage),
    feedState: getUsersFeedState(state)
  }),
  { getUsersThunkConnect: getUsersThunk }
)(UsersListContainer);
