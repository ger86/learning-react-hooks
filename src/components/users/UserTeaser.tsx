import React from 'react';
import { Link } from 'react-router-dom';
import ShadowBox from 'components/styled/ShadowBox';
import { userDetailRoute } from 'config/routes';
import { User } from 'types/User';

const UserTeaser = ({ user }: { user: User }) => (
  <ShadowBox>
    <h3>{`${user.first_name} ${user.last_name}`}</h3>
    <p>
      <strong>email: </strong>
      {user.email}
    </p>
    <div>
      <Link className="btn btn-outline-primary" to={userDetailRoute(user.id)}>
        Ver más
      </Link>
    </div>
  </ShadowBox>
);

export default UserTeaser;
