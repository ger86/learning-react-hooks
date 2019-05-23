import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRoute, usersRoute, userCreateRoute } from 'config/routes';
import { getCurrentUser } from 'ducks/selectors';
import './style.sass';

class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: null
  };

  render() {
    const { user } = this.props;
    return (
      <header className="the-header">
        <div className="container">
          <div className="the-header__wrapper">
            <div className="header-brand">
              <Link to={usersRoute()}>Cloud District</Link>
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
  }
}

export default connect(state => ({
  user: getCurrentUser(state)
}))(Header);
