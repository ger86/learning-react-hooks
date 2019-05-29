import React from "react";
import { connect } from "react-redux";
import UserDetail from "components/users/UserDetail";
import { getUserThunk } from "ducks/users";
import { ReduxState } from "ducks";
import { getUserById } from "ducks/selectors";
import useApiCall, { State as ApiCallState } from "hooks/useApiCall";
import { User } from "types/User";

interface OwnProps {
  userId: number;
}

interface PropsType extends OwnProps {
  getUserThunkConnect: (userId: string | number) => Promise<void>;
  user: User;
}

const UserDetailContainer = ({
  getUserThunkConnect,
  user,
  userId
}: PropsType) => {
  const { state: apiCallState }: { state: ApiCallState } = useApiCall(
    getUserThunkConnect,
    [userId]
  );
  return <UserDetail user={user} state={apiCallState} />;
};

export default connect(
  (state: ReduxState, ownProps: OwnProps) => ({
    user: getUserById(state, ownProps.userId)
  }),
  { getUserThunkConnect: getUserThunk }
)(UserDetailContainer);
