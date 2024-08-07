import CustomLayout from '@custom/core/CustomLayout';
import CustomTheme from '@custom/core/CustomTheme';
import { SnackbarProvider } from 'notistack';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@custom/core/CustomSettings/customSettingsSlice';
import { useAppSelector } from 'app/store/hooks';
import { useSelector } from 'react-redux';
import withAppProviders from './withAppProviders';
import AuthenticationProvider from './auth/AuthenticationProvider';

import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = import.meta.env.VITE_API_HOST;
axios.defaults.withCredentials = true
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useAppSelector(selectCurrentLanguageDirection);
	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);
	return (
		<CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
			<CustomTheme
				theme={mainTheme}
				root
			>
				<AuthenticationProvider>
					<SnackbarProvider
						maxSnack={5}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						classes={{
							containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
						}}
					>
						<CustomLayout layouts={themeLayouts} />
					</SnackbarProvider>
				</AuthenticationProvider>
			</CustomTheme>
		</CacheProvider>
	);
}

export default withAppProviders(App);
