import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserForm from 'components/users/UserForm';
import useApiCall from 'hooks/useApiCall';
import userPropType from 'prop-types/userPropType';

const initialValues = user =>
  user ? { ...user } : { first_name: '', email: '' };

const UserFormContainer = ({ sendForm, user }) => {
  const [userModel, setUserModel] = useState(initialValues(user));

  useEffect(() => {
    setUserModel(initialValues(user));
  }, [user]);

  const { state: apiCallState, apiCall } = useApiCall(async () =>
    sendForm(userModel)
  );

  const onSubmit = async event => {
    event.preventDefault();
    apiCall();
  };

  const onChangeName = event => {
    setUserModel({ email: userModel.email, first_name: event.target.value });
  };

  const onChangeEmail = event => {
    setUserModel({
      first_name: userModel.first_name,
      email: event.target.value
    });
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

UserFormContainer.propTypes = {
  sendForm: PropTypes.func.isRequired,
  user: userPropType
};

UserFormContainer.defaultProps = {
  user: null
};

export default UserFormContainer;
