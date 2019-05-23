import React from 'react';
import PropTypes from 'prop-types';
import FacebookButton from 'components/styled/FacebookButton';

const LoginForm = ({ onFacebookClick }) => (
  <>
    <h1>¡Bienvenido!</h1>
    <p>Inicia sesión con Facebook para ver la lista de usuarios</p>
    <FacebookButton type="button" onClick={onFacebookClick}>
      Iniciar sesión con Facebook
    </FacebookButton>
  </>
);

LoginForm.propTypes = {
  onFacebookClick: PropTypes.func.isRequired
};

export default LoginForm;
