import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'components/styled/Alert';
import userPropType from 'prop-types/userPropType';

const UserForm = ({
  success,
  error,
  sending,
  onChangeName,
  onChangeEmail,
  onSubmit,
  userModel
}) => (
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

UserForm.propTypes = {
  onChangeName: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  sending: PropTypes.bool.isRequired,
  userModel: userPropType.isRequired,
  error: PropTypes.object
};

UserForm.defaultProps = {
  error: null
};

export default UserForm;
