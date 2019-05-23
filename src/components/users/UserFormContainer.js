import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserForm from 'components/users/UserForm';
import userPropType from 'prop-types/userPropType';

const UserFormContainer = ({ onSubmit, user }) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userModel, setUserModel] = useState(
    user // eslint-disable-next-line react/destructuring-assignment
      ? { ...user }
      : { first_name: '', email: '' }
  );

  const onSubmitForm = async event => {
    event.preventDefault();
    setSending(true);
    try {
      await onSubmit(userModel);
      setSending(false);
      setError(false);
      setSuccess(true);
    } catch (exception) {
      setSending(false);
      setError(exception);
      setSuccess(false);
    }
  };

  const onChangeName = event => {
    setUserModel({
      userModel: { email: userModel.email, first_name: event.target.value }
    });
  };

  const onChangeEmail = event => {
    setUserModel({
      userModel: { first_name: userModel.first_name, email: event.target.value }
    });
  };

  return (
    <UserForm
      success={success}
      error={error}
      sending={sending}
      userModel={userModel}
      onChangeEmail={onChangeEmail}
      onChangeName={onChangeName}
      onSubmit={onSubmitForm}
    />
  );
};

UserFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: userPropType
};

UserFormContainer.defaultProps = {
  user: null
};

export default UserFormContainer;
