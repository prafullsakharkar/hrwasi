import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const SignIn = lazy(() => import('./SignIn'));
const SignOut = lazy(() => import('./SignOut'));
const SignUp = lazy(() => import('./SignUp'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const ConfirmationRequired = lazy(() => import('./ConfirmationRequired'));
const Activation = lazy(() => import('./Activation'));

const AuthenticationConfigs = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-in',
      element: <SignIn />,
    },
    {
      path: 'sign-out',
      element: <SignOut />,
      auth: null,
    },
    {
      path: 'sign-up',
      element: <SignUp />,
    },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: 'password-reset/confirm/:uid/:token',
      element: <ResetPassword />,
    },
    {
      path: 'confirmation-required',
      element: <ConfirmationRequired />,
    },
    {
      path: 'activate/:uid/:token',
      element: <Activation />,
    },
  ],
};

export default AuthenticationConfigs;
