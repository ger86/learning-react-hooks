import React, { useState, useEffect } from "react";
import UserForm from "components/users/UserForm";
import useApiCall, { ApiCallFn } from "hooks/useApiCall";
import { User } from "types/User";

const initialValues = (user?: User) =>
  user ? { ...user } : { first_name: "", email: "" };

const UserFormContainer = ({
  sendForm,
  user
}: {
  user?: User;
  sendForm: ApiCallFn;
}) => {
  const [userModel, setUserModel] = useState(initialValues(user));

  useEffect(() => {
    setUserModel(initialValues(user));
  }, [user]);

  const { state: apiCallState, execute: executeApiCall } = useApiCall(
    sendForm,
    [userModel],
    { executeOnMount: false }
  );

  const onSubmit = async (event: any) => {
    event.preventDefault();
    executeApiCall();
  };

  const onChangeName = (event: any) => {
    const {
      target: { value }
    } = event;
    setUserModel(prevUserModel => ({
      ...prevUserModel,
      first_name: value
    }));
  };

  const onChangeEmail = (event: any) => {
    const {
      target: { value }
    } = event;
    setUserModel(prevUserModel => ({
      ...prevUserModel,
      email: value
    }));
  };
  return (
    <UserForm
      {...apiCallState}
      userModel={userModel}
      onChangeEmail={onChangeEmail}
      onChangeName={onChangeName}
      onSubmit={onSubmit}
    />
  );
};

export default UserFormContainer;
