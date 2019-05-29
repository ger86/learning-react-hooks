import React from 'react';
import Loading from 'components/common/Loading';
import Alert from 'components/styled/Alert';
import UserTeaser from 'components/users/UserTeaser';
import Pagination from 'components/common/Pagination';
import { User } from 'types/User';
import { FeedState } from 'ducks/users';

const UserList = ({
  users,
  feedState,
  currentPage,
  generateLinkForPage
}: {
  users: null | Array<User>,
  feedState: FeedState,
  currentPage: number,
  generateLinkForPage: (page: string | number) => string
}) => (
  <>
    {feedState.error && <Alert error>{feedState.error.message}</Alert>}
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

export default UserList;
