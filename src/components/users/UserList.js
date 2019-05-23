import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/common/Loading';
import Alert from 'components/styled/Alert';
import UserTeaser from 'components/users/UserTeaser';
import Pagination from 'components/common/Pagination';
import userPropType from 'prop-types/userPropType';

const UserList = ({ users, feedState, currentPage, generateLinkForPage }) => (
  <>
    {feedState.error && <Alert error>{feedState.message}</Alert>}
    {feedState.loading && <Loading>Cargando usuarios</Loading>}
    {users && users.length === 0 && <Alert error>No hay resultados</Alert>}
    {users && (
      <>
        <h1>Lista de usuarios</h1>
        <p>Aquí puedes ver la lista de usuarios</p>
        {users.map(user => (
          <UserTeaser key={`user-${user.id}`} user={user} />
        ))}
        <Pagination
          totalItems={feedState.totalItems}
          pageSize={feedState.resultsPerPage}
          currentPage={currentPage}
          generateLinkForPage={generateLinkForPage}
        />
      </>
    )}
  </>
);

UserList.propTypes = {
  feedState: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(userPropType),
  currentPage: PropTypes.number.isRequired,
  generateLinkForPage: PropTypes.func.isRequired
};

UserList.defaultProps = {
  users: null
};

export default UserList;
