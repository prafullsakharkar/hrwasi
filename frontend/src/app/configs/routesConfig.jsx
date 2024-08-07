import CustomUtils from '@custom/utils';
import CustomLoading from '@custom/core/CustomLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import PageConfigs from '../main/pages/PageConfigs';
import AppsConfigs from '../main/apps/appsConfigs';
import AuthenticationConfigs from '../main/authentications/AuthenticationConfigs';

const routeConfigs = [
	AuthenticationConfigs,
	PageConfigs,
	...AppsConfigs,
];
/**
 * The routes of the application.
 */
const routes = [
	...CustomUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/apps/account/users" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <CustomLoading />
	},
	{
		path: '*',
		element: <Navigate to="pages/404" />,
	},
];
export default routes;
