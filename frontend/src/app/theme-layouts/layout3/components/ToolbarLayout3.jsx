import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { selectCustomCurrentLayoutConfig, selectToolbarTheme } from '@custom/core/CustomSettings/customSettingsSlice';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import { useAppSelector } from 'app/store/hooks';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import UserMenu from '../../shared-components/UserMenu';
import Logo from '../../shared-components/Logo';

/**
 * The toolbar layout 3.
 */
function ToolbarLayout3(props) {
	const { className = '' } = props;
	const config = useAppSelector(selectCustomCurrentLayoutConfig);
	const toolbarTheme = useAppSelector(selectToolbarTheme);
	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="custom-toolbar"
				className={clsx('relative z-20 flex shadow-md', className)}
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.paper }}
			>
				<Toolbar className="container min-h-48 p-0 md:min-h-64 lg:px-24">
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
						</Hidden>
					)}

					<Hidden lgDown>
						<div className={clsx('flex shrink-0 items-center')}>
							<Logo />
						</div>
					</Hidden>

					<div className="flex h-full items-center overflow-x-auto px-8 md:px-0">
						<AdjustFontSize />
						<FullScreenToggle />
						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout3);
