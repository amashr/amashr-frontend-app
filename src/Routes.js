/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';


import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';

const routesConfig = [{
  exact: true,
  path: '/',
  component: () => <Redirect to="/login" />
},
{
  exact: true,
  path: '/404',
  component: lazy(() => import('./views/pages/Error404View'))
},
{
  exact: true,
  guard: GuestGuard,
  path: '/login',
  component: lazy(() => import('./views/auth/LoginView'))
},
{
  exact: true,
  guard: GuestGuard,
  path: '/register',
  component: lazy(() => import('./views/auth/RegisterView'))
},
{
  path: '/app',
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [{
    exact: true,
    path: '/app/employee',
    component: () => <Redirect to="/app/employee/home" />
  },
  {
    exact: true,
    path: '/app/employee/home',
    component: lazy(() => import('./views/employee/HomeView'))
  },
  {
    exact: true,
    path: '/app/account',
    component: lazy(() => import('./views/pages/AccountView'))
  },
  {
    exact: true,
    path: '/app/calendar',
    component: lazy(() => import('./views/calendar/CalendarView'))
  },
  {
    exact: true,
    path: '/app/social/profile',
    component: lazy(() => import('./views/social/ProfileView'))
  },
  {
    exact: true,
    path: '/app/social',
    component: () => <Redirect to="/app/social/profile" />
  }
  ]
}
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
