import { useDeepCompareEffect } from '@custom/hooks';
import _ from '@lodash';
import AppContext from 'app/AppContext';
import {
	generateSettings,
	selectCustomCurrentSettings,
	selectCustomDefaultSettings,
	setSettings
} from '@custom/core/CustomSettings/customSettingsSlice';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { matchRoutes, useLocation } from 'react-router-dom';
import CustomLoading from '../CustomLoading';

/**
 * CustomLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function CustomLayout(props) {
	const { layouts, children } = props;
	const dispatch = useAppDispatch();
	const settings = useAppSelector(selectCustomCurrentSettings);
	const defaultSettings = useAppSelector(selectCustomDefaultSettings);
	const layoutStyle = settings.layout.style;
	const appContext = useContext(AppContext);
	const { routes } = appContext;
	const location = useLocation();
	const { pathname } = location;
	const matchedRoutes = matchRoutes(routes, pathname);
	const matched = matchedRoutes?.[0] || false;
	const newSettings = useRef(settings);
	const shouldAwaitRender = useCallback(() => {
		let _newSettings;

		/**
		 * On Path changed
		 */
		// if (prevPathname !== pathname) {
		if (typeof matched !== 'boolean') {
			/**
			 * if matched route has settings
			 */
			const routeSettings = matched.route.settings;
			_newSettings = generateSettings(defaultSettings, routeSettings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, matched]);
	shouldAwaitRender();
	const currentSettings = useMemo(() => newSettings.current, [newSettings.current]);
	useDeepCompareEffect(() => {
		if (!_.isEqual(currentSettings, settings)) {
			dispatch(setSettings(currentSettings));
		}
	}, [dispatch, currentSettings, settings]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return useMemo(() => {
		if (!_.isEqual(currentSettings, settings)) {
			return <CustomLoading />;
		}

		return Object.entries(layouts).map(([key, Layout]) => {
			if (key === layoutStyle) {
				return (
					<React.Fragment key={key}>
						<Layout>{children}</Layout>
					</React.Fragment>
				);
			}

			return null;
		});
	}, [layouts, layoutStyle, children, currentSettings, settings]);
}

export default CustomLayout;
