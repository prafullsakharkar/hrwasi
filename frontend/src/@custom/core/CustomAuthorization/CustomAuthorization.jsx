import { Component } from 'react';
import { matchRoutes } from 'react-router-dom';
import CustomUtils from '@custom/utils';
import AppContext from 'app/AppContext';
import withRouter from '@custom/core/withRouter';
import history from '@history';
import {
	getSessionRedirectUrl,
	resetSessionRedirectUrl,
	setSessionRedirectUrl
} from '@custom/core/CustomAuthorization/sessionRedirectUrl';
import CustomLoading from '@custom/core/CustomLoading';

function isUserGuest(role) {
	return !role || (Array.isArray(role) && role?.length === 0);
}

/**
 * CustomAuthorization is a higher-order component that wraps its child component which handles the authorization logic of the app.
 * It checks the provided Auth property from CustomRouteItemType (auth property) against the current logged-in user role.
 */
class CustomAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes
		};
	}

	componentDidMount() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { accessGranted } = this.state;
		return nextState.accessGranted !== accessGranted;
	}

	componentDidUpdate() {
		const { accessGranted } = this.state;

		if (!accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { location, userRole } = props;
		const { pathname } = location;
		const matchedRoutes = matchRoutes(state.routes, pathname);
		const matched = matchedRoutes ? matchedRoutes[0] : false;
		const isGuest = isUserGuest(userRole);

		if (!matched) {
			return { accessGranted: true };
		}

		const { route } = matched;
		const userHasPermission = CustomUtils.hasPermission(route.auth, userRole);
		const ignoredPaths = ['/', '/callback', '/sign-in', '/sign-out', '/logout', '/404'];

		if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl(pathname);
		}

		/**
		 * If user is member but don't have permission to view the route
		 * redirected to main route '/'
		 */
		if (!userHasPermission && !isGuest && !ignoredPaths.includes(pathname)) {
			setSessionRedirectUrl('/');
		}

		return {
			accessGranted: matched ? userHasPermission : true
		};
	}

	redirectRoute() {
		const { userRole, loginRedirectUrl = '/' } = this.props;
		const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

		/*
		User is guest
		Redirect to Login Page
		*/
		if (isUserGuest(userRole)) {
			setTimeout(() => history.push('/sign-in'), 0);
		} else {
			/*
		  User is member
		  User must be on unAuthorized page or just logged in
		  Redirect to dashboard or loginRedirectUrl
			*/
			setTimeout(() => history.push(redirectUrl), 0);
			resetSessionRedirectUrl();
		}
	}

	render() {
		const { accessGranted } = this.state;
		const { children } = this.props;
		return accessGranted ? children : <CustomLoading />;
	}
}
CustomAuthorization.contextType = AppContext;
export default withRouter(CustomAuthorization);
