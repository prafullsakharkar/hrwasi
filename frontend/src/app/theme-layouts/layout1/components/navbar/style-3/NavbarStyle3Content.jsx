import CustomScrollbars from '@custom/core/CustomScrollbars';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import CustomNavigation from '@custom/core/CustomNavigation';
import { selectContrastMainTheme } from '@custom/core/CustomSettings/customSettingsSlice';
import { useLocation } from 'react-router-dom';
import useThemeMediaQuery from '@custom/hooks/useThemeMediaQuery';
import isUrlInChildren from '@custom/core/CustomNavigation/isUrlInChildren';
import { selectNavigation } from 'app/theme-layouts/shared-components/navigation/store/navigationSlice';
import { navbarCloseMobile } from 'app/theme-layouts/shared-components/navbar/navbarSlice';

const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary
}));
const StyledPanel = styled(CustomScrollbars)(({ theme, opened }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	transition: theme.transitions.create(['opacity'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.shortest
	}),
	opacity: 0,
	pointerEvents: 'none',
	...(opened && {
		opacity: 1,
		pointerEvents: 'initial'
	})
}));

/**
 * Check if the item needs to be opened.
 */
function needsToBeOpened(location, item) {
	return location && isUrlInChildren(item, location.pathname);
}

/**
 * The navbar style 3 content.
 */
function NavbarStyle3Content(props) {
	const { className = '', dense = false } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const navigation = useAppSelector(selectNavigation);
	const [selectedNavigation, setSelectedNavigation] = useState([]);
	const [panelOpen, setPanelOpen] = useState(false);
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const contrastTheme = useAppSelector(selectContrastMainTheme(theme.palette.primary.main));
	const location = useLocation();
	useEffect(() => {
		navigation?.forEach((item) => {
			if (needsToBeOpened(location, item)) {
				setSelectedNavigation([item]);
			}
		});
	}, [navigation, location]);

	function handleParentItemClick(selected) {
		/** if there is no child item do not set/open panel
		 */
		if (!selected.children) {
			setSelectedNavigation([]);
			setPanelOpen(false);
			return;
		}

		/**
		 * If navigation already selected toggle panel visibility
		 */
		if (selectedNavigation[0]?.id === selected.id) {
			setPanelOpen(!panelOpen);
		} else {
			/**
			 * Set navigation and open panel
			 */
			setSelectedNavigation([selected]);
			setPanelOpen(true);
		}
	}

	function handleChildItemClick() {
		setPanelOpen(false);

		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}

	return (
		<ClickAwayListener onClickAway={() => setPanelOpen(false)}>
			<Root className={clsx('flex h-full flex-auto', className)}>
				<ThemeProvider theme={contrastTheme}>
					<div
						id="custom-navbar-side-panel"
						className="flex shrink-0 flex-col items-center"
					>
						<img
							className="my-32 w-44"
							src="assets/images/logo/mwt.png"
							alt="logo"
						/>

						<CustomScrollbars
							className="flex min-h-0 w-full flex-1 justify-center overflow-y-auto overflow-x-hidden"
							option={{ suppressScrollX: true, wheelPropagation: false }}
						>
							<CustomNavigation
								className={clsx('navigation')}
								navigation={navigation}
								layout="vertical-2"
								onItemClick={handleParentItemClick}
								firstLevel
								selectedId={selectedNavigation[0]?.id}
								dense={Boolean(dense)}
							/>
						</CustomScrollbars>
					</div>
				</ThemeProvider>

				{selectedNavigation.length > 0 && (
					<StyledPanel
						id="custom-navbar-panel"
						opened={panelOpen}
						className={clsx('overflow-y-auto overflow-x-hidden shadow')}
						option={{ suppressScrollX: true, wheelPropagation: false }}
					>
						<CustomNavigation
							className={clsx('navigation')}
							navigation={selectedNavigation}
							layout="vertical"
							onItemClick={handleChildItemClick}
						/>
					</StyledPanel>
				)}
			</Root>
		</ClickAwayListener>
	);
}

export default memo(NavbarStyle3Content);
