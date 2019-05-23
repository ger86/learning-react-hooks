import React from 'react';
import { Link } from 'react-router-dom';
import ShadowBox from 'components/styled/ShadowBox';
import userPropType from 'prop-types/userPropType';
import { userDetailRoute } from 'config/routes';

const UserTeaser = ({ user }) => (
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

UserTeaser.propTypes = {
  user: userPropType.isRequired
};

export default UserTeaser;
