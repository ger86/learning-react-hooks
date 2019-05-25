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

  const { state: apiCallState, execute: executeApiCall } = useApiCall(
    sendForm,
    [userModel],
    { executeOnMount: false }
  );

  const onSubmit = async event => {
    event.preventDefault();
    executeApiCall();
  };

  const onChangeName = event => {
    const {
      target: { value }
    } = event;
    setUserModel(prevUserModel => ({
      ...prevUserModel,
      first_name: value
    }));
  };

  const onChangeEmail = event => {
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

UserFormContainer.propTypes = {
  sendForm: PropTypes.func.isRequired,
  user: userPropType
};

UserFormContainer.defaultProps = {
  user: null
};

export default UserFormContainer;
