import React from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { Redirect } from "react-router";
import { logoutAction } from "ducks/security";
import { loginRoute } from "config/routes";

interface PropsType {
  logoutActionConnect: () => AnyAction;
}

const LogoutContainer = ({ logoutActionConnect }: PropsType) => {
  logoutActionConnect();
  return <Redirect to={loginRoute()} />;
};

export default connect(
  null,
  { logoutActionConnect: logoutAction }
)(LogoutContainer);
