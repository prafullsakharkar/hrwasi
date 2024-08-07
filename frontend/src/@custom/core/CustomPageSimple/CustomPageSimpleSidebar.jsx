import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import CustomPageSimpleSidebarContent from './CustomPageSimpleSidebarContent';
/**
 * The CustomPageSimpleSidebar component.
 */
const CustomPageSimpleSidebar = forwardRef((props, ref) => {
	const { open = true, position, variant, onClose = () => { } } = props;
	const [isOpen, setIsOpen] = useState(open);
	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));
	const handleToggleDrawer = useCallback((val) => {
		setIsOpen(val);
	}, []);
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
						root: clsx('CustomPageSimple-sidebarWrapper', variant),
						paper: clsx(
							'CustomPageSimple-sidebar',
							variant,
							position === 'left' ? 'CustomPageSimple-leftSidebar' : 'CustomPageSimple-rightSidebar',
							'max-w-full'
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					// container={rootRef.current}
					BackdropProps={{
						classes: {
							root: 'CustomPageSimple-backdrop'
						}
					}}
					style={{ position: 'absolute' }}
				>
					<CustomPageSimpleSidebarContent {...props} />
				</SwipeableDrawer>
			</Hidden>

			{variant === 'permanent' && (
				<Hidden lgDown>
					<Drawer
						variant="permanent"
						anchor={position}
						className={clsx(
							'CustomPageSimple-sidebarWrapper',
							variant,
							isOpen ? 'opened' : 'closed',
							position === 'left' ? 'CustomPageSimple-leftSidebar' : 'CustomPageSimple-rightSidebar'
						)}
						open={isOpen}
						onClose={onClose}
						classes={{
							paper: clsx('CustomPageSimple-sidebar border-0', variant)
						}}
					>
						<CustomPageSimpleSidebarContent {...props} />
					</Drawer>
				</Hidden>
			)}
		</>
	);
});
export default CustomPageSimpleSidebar;
