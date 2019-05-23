import React, { lazy, Suspense } from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from 'components/common/Loading';
import PrivateRoute from 'components/hoc/PrivateRoute';
import PublicRoute from 'components/hoc/PublicRoute';
import * as appRoutes from 'config/routes';
import Header from 'components/common/Header';
import LoginScene from 'scenes/LoginScene';
import LogoutScene from 'scenes/LogoutScene';
import UsersScene from 'scenes/UsersScene';
import configureStore from 'services/configureStore';
import initFacebook from 'services/initFacebook';
import './sass/base/base.sass';

const UserDetailScene = lazy(() => import('scenes/UserDetailScene'));
const UserEditScene = lazy(() => import('scenes/UserEditScene'));
const UserCreateScene = lazy(() => import('scenes/UserCreateScene'));

initFacebook();
const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Suspense fallback={<Loading />}>
            <Header />
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="the-content">
                    <Switch>
                      <PublicRoute
                        path={appRoutes.loginRoute()}
                        component={LoginScene}
                      />
                      <PrivateRoute
                        path={appRoutes.logoutRoute()}
                        component={LogoutScene}
                      />
                      <PrivateRoute
                        path={appRoutes.userCreateRoute()}
                        component={UserCreateScene}
                      />
                      <PrivateRoute
                        path={appRoutes.userEditRoute()}
                        component={UserEditScene}
                      />
                      <PrivateRoute
                        path={appRoutes.userDetailRoute()}
                        component={UserDetailScene}
                      />
                      <PrivateRoute
                        exact
                        path={appRoutes.usersRoute()}
                        component={UsersScene}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
