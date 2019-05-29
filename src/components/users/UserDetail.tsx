import React from "react";
import { Link } from "react-router-dom";
import Loading from "components/common/Loading";
import Alert from "components/styled/Alert";
import ShadowBox from "components/styled/ShadowBox";
import { State as ApiCallState } from "hooks/useApiCall";
import { userEditRoute } from "config/routes";
import { User } from "types/User";

const UserDetail = ({ user, state }: { user: User; state: ApiCallState }) => (
  <>
    {state.error && (
      <Alert error>
        {state.error.code === 404
          ? "No se encontró el usuario"
          : state.error.message}
      </Alert>
    )}
    {state.sending && <Loading>Cargando usuario</Loading>}
    {user && (
      <ShadowBox>
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <p>
          <strong>email: </strong>
          {user.email}
        </p>
        <div>
          <Link className="btn btn-outline-primary" to={userEditRoute(user.id)}>
            Editar
          </Link>
        </div>
      </ShadowBox>
    )}
  </>
);

export default UserDetail;
