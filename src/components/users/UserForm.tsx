import React from 'react';
import Alert from 'components/styled/Alert';
import { ApiError } from 'types/ApiError';

interface PropsType {
  success: boolean;
  error: ApiError | null;
  sending: boolean;
  onChangeName: (event: any) => void;
  onChangeEmail: (event: any) => void;
  onSubmit: (event: any) => Promise<void>;
  userModel: { first_name: string; email: string };
}

const UserForm = ({
  success,
  error = null,
  sending,
  onChangeName,
  onChangeEmail,
  onSubmit,
  userModel
}: PropsType) => (
  <>
    {error && (
      <Alert error>
        {error.code === 404 ? 'No se encontró el usuario' : error.message}
      </Alert>
    )}
    {success && <Alert success>Formulario enviado con éxito</Alert>}
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">Nombre</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          className="form-control"
          onChange={onChangeName}
          value={userModel.first_name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          className="form-control"
          onChange={onChangeEmail}
          value={userModel.email}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
    {sending ? <div>Enviando</div> : null}
  </>
);

export default UserForm;
