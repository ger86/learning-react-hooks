import React from "react";
import FacebookButton from "components/styled/FacebookButton";

const LoginForm = ({
  onFacebookClick
}: {
  onFacebookClick: (arg: any) => any;
}) => (
  <>
    <h1>¡Bienvenido!</h1>
    <p>Inicia sesión con Facebook para ver la lista de usuarios</p>
    <FacebookButton type="button" onClick={onFacebookClick}>
      Iniciar sesión con Facebook
    </FacebookButton>
  </>
);

export default LoginForm;
