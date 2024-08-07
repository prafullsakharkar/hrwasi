import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import useThemeMediaQuery from '@custom/hooks/useThemeMediaQuery';
import { selectCustomCurrentLayoutConfig } from '@custom/core/CustomSettings/customSettingsSlice';
import { navbarToggle, navbarToggleMobile } from 'app/theme-layouts/shared-components/navbar/navbarSlice';
import NavbarToggleFab from 'app/theme-layouts/shared-components/navbar/NavbarToggleFab';

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props) {
	const { className } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const config = useAppSelector(selectCustomCurrentLayoutConfig);
	const dispatch = useAppDispatch();
	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
			position={config.navbar.position}
		/>
	);
}

export default NavbarToggleFabLayout1;
