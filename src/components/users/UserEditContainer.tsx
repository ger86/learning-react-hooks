import React from "react";
import { connect } from "react-redux";
import Alert from "components/styled/Alert";
import Loading from "components/common/Loading";
import UserFormContainer from "components/users/UserFormContainer";
import { ReduxState } from "ducks";
import { getUserThunk, patchUserThunk } from "ducks/users";
import { getUserById } from "ducks/selectors";
import useApiCall from "hooks/useApiCall";
import { User } from "types/User";

interface OwnProps {
  userId: number;
}

interface PropsType extends OwnProps {
  getUserThunkConnect: (userId: string | number) => Promise<void>;
  patchUserThunkConnect: (user: User) => Promise<void>;
  user: User;
}

const UserEditContainer = ({
  userId,
  getUserThunkConnect,
  patchUserThunkConnect,
  user
}: PropsType) => {
  const { state: apiCallState } = useApiCall(getUserThunkConnect, [userId]);

  const onSubmit = async (userData: User) => patchUserThunkConnect(userData);

  if (apiCallState.error) {
    return (
      <Alert error>
        {apiCallState.error.code === 404
          ? "No se encontró el usuario"
          : apiCallState.error.message}
      </Alert>
    );
  } else if (apiCallState.sending) {
    return <Loading>Cargando usuario</Loading>;
  }
  return <UserFormContainer user={user} sendForm={onSubmit} />;
};

export default connect(
  (state: ReduxState, ownProps: OwnProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk, patchUserThunkConnect: patchUserThunk }
)(UserEditContainer);
