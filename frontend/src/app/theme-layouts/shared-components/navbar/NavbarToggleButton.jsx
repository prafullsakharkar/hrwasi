import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectCustomCurrentSettings, setDefaultSettings } from '@custom/core/CustomSettings/customSettingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@custom/hooks/useThemeMediaQuery';
import CustomSvgIcon from '@custom/core/CustomSvgIcon';
import { navbarToggle, navbarToggleMobile } from './navbarSlice';

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props) {
	const {
		className = '',
		children = (
			<CustomSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</CustomSvgIcon>
		)
	} = props;
	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings = useAppSelector(selectCustomCurrentSettings);
	const { config } = settings.layout;
	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
