import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const AccountApp = lazy(() => import('./AccountApp'));
const Users = lazy(() => import('./users/Users'));
/**
 * The Account app configuration.
 */
const AccountAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/account',
			element: <AccountApp />,
			auth: authRoles.admin,
			children: [
				{
					path: '',
					element: <Navigate to="users" />
				},
				{
					path: 'users',
					element: <Users />
				},
				// {
				// 	path: 'users/:userId/*',
				// 	element: <User />
				// },

			]
		}
	]
};
export default AccountAppConfig;
