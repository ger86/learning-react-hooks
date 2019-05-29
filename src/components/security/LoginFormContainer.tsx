import React from "react";
import { connect } from "react-redux";
import { facebookLoginThunk } from "ducks/security";
import LoginForm from "components/security/LoginForm";

interface PropsType {
  facebookLoginThunkConnect: () => Promise<void>;
}

const LoginFormContainer = ({ facebookLoginThunkConnect }: PropsType) => {
  const onFacebookClick = () => facebookLoginThunkConnect();
  return <LoginForm onFacebookClick={onFacebookClick} />;
};

export default connect(
  null,
  { facebookLoginThunkConnect: facebookLoginThunk }
)(LoginFormContainer);
