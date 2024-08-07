import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'src/app/auth';

const Error404Page = lazy(() => import('./Error404Page'));
const Error500Page = lazy(() => import('./Error500Page'));
/**
 * The error pages config.
 */
const PageConfigs = {
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
	routes: [
		{
			path: 'pages',
			auth: authRoles.onlyGuest,
			children: [
				{
					path: '',
					element: <Navigate to="404" />
				},
				{
					path: '404',
					element: <Error404Page />
				},
				{
					path: '500',
					element: <Error500Page />
				}
			]
		}
	]
};
export default PageConfigs;
