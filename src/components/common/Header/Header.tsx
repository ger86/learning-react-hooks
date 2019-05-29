import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRoute, usersRoute, userCreateRoute } from 'config/routes';
import { ReduxState } from 'ducks';
import { getCurrentUser } from 'ducks/selectors';
import { FacebookUser } from 'types/FacebookUser';
import './style.sass';

const Header = ({ user }: { user: FacebookUser | null }) => (
  <header className="the-header">
    <div className="container">
      <div className="the-header__wrapper">
        <div className="header-brand">
          <Link to={usersRoute()}>Latte and Code</Link>
        </div>
        {user && (
          <div className="header-menu">
            <Link className="header-menu__element" to={userCreateRoute()}>
              Crear usuario
            </Link>
            <div className="header-menu__element header-menu__image">
              <img src={user.picture.data.url} alt={user.name} />
            </div>
            <div className="header-menu__element header-menu__name">
              {user.name}
            </div>
            <Link className="header-menu__element" to={logoutRoute()}>
              Cerrar sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  </header>
);

export default connect((state: ReduxState) => ({
  user: getCurrentUser(state)
}))(Header);
