import React from "react";
import { connect } from "react-redux";
import UserFormContainer from "components/users/UserFormContainer";
import { postUserThunk } from "ducks/users";
import { ApiCallFn } from "hooks/useApiCall";
import { User } from "types/User";

interface PropsType {
  postUserThunkConnect: (user: User) => Promise<void>;
}

const UserCreateContainer = ({ postUserThunkConnect }: PropsType) => {
  const onSubmit: ApiCallFn = async (user: User) => postUserThunkConnect(user);

  return <UserFormContainer sendForm={onSubmit} />;
};

export default connect(
  null,
  { postUserThunkConnect: postUserThunk }
)(UserCreateContainer);
