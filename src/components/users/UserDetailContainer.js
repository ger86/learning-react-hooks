import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from 'components/common/Loading';
import Alert from 'components/styled/Alert';
import UserDetail from 'components/users/UserDetail';
import { usersRoute } from 'config/routes';
import { getUserThunk } from 'ducks/users';
import { getUserById } from 'ducks/selectors';
import userPropType from 'prop-types/userPropType';

class UsersListContainer extends PureComponent {
  static propTypes = {
    getUserThunkConnect: PropTypes.func.isRequired,
    user: userPropType,
    userId: PropTypes.string.isRequired
  };

  static defaultProps = {
    user: null
  };

  state = {
    error: null
  };

  async componentDidMount() {
    this.requestUser();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (prevProps.userId !== userId) {
      this.requestUser();
    }
  }

  requestUser = async () => {
    const { userId } = this.props;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      await this.props.getUserThunkConnect(userId);
      this.setState({ error: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  generateLinkForPage = page => usersRoute(page);

  render() {
    const { error } = this.state;
    const { user } = this.props;
    if (error) {
      return (
        <Alert error>
          {error.code === 404 ? 'No se encontró el usuario' : error.message}
        </Alert>
      );
    } else if (user === null) {
      return <Loading>Cargando usuario</Loading>;
    }
    return <UserDetail user={user} />;
  }
}

export default connect(
  (state, ownProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk }
)(UsersListContainer);
