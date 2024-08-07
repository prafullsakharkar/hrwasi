import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import CustomPageCardedSidebarContent from './CustomPageCardedSidebarContent';
/**
 * The CustomPageCardedSidebar component is a sidebar for the CustomPageCarded component.
 */
const CustomPageCardedSidebar = forwardRef((props, ref) => {
	const { open = true, position, variant, onClose = () => { } } = props;
	const [isOpen, setIsOpen] = useState(open);
	const handleToggleDrawer = useCallback((val) => {
		setIsOpen(val);
	}, []);
	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));
	useEffect(() => {
		handleToggleDrawer(open);
	}, [handleToggleDrawer, open]);
	return (
		<>
			<Hidden lgUp={variant === 'permanent'}>
				<SwipeableDrawer
					variant="temporary"
					anchor={position}
					open={isOpen}
					onOpen={() => { }}
					onClose={() => onClose()}
					disableSwipeToOpen
					classes={{
						root: clsx('CustomPageCarded-sidebarWrapper', variant),
						paper: clsx(
							'CustomPageCarded-sidebar',
							variant,
							position === 'left' ? 'CustomPageCarded-leftSidebar' : 'CustomPageCarded-rightSidebar'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					BackdropProps={{
						classes: {
							root: 'CustomPageCarded-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<CustomPageCardedSidebarContent {...props} />
				</SwipeableDrawer>
			</Hidden>
			{variant === 'permanent' && (
				<Hidden lgDown>
					<Drawer
						variant="permanent"
						anchor={position}
						className={clsx(
							'CustomPageCarded-sidebarWrapper',
							variant,
							isOpen ? 'opened' : 'closed',
							position === 'left' ? 'CustomPageCarded-leftSidebar' : 'CustomPageCarded-rightSidebar'
						)}
						open={isOpen}
						onClose={onClose}
						classes={{
							paper: clsx('CustomPageCarded-sidebar', variant)
						}}
					>
						<CustomPageCardedSidebarContent {...props} />
					</Drawer>
				</Hidden>
			)}
		</>
	);
});
export default CustomPageCardedSidebar;
