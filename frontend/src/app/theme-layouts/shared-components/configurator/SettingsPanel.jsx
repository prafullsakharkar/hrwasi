import CustomScrollbars from '@custom/core/CustomScrollbars';
import IconButton from '@mui/material/IconButton';
import CustomSvgIcon from '@custom/core/CustomSvgIcon';
import Typography from '@mui/material/Typography';
import CustomSettings from '@custom/core/CustomSettings/CustomSettings';
import CustomSettingsViewerDialog from 'app/theme-layouts/shared-components/CustomSettingsViewerDialog';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		position: 'fixed',
		width: 380,
		maxWidth: '90vw',
		backgroundColor: theme.palette.background.paper,
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		borderRadius: 0
	}
}));
const Transition = forwardRef((props, ref) => {
	const { children, ...other } = props;
	const theme = useTheme();

	if (!children) {
		return null;
	}

	return (
		<Slide
			direction={theme.direction === 'ltr' ? 'left' : 'right'}
			ref={ref}
			{...other}
		>
			{children}
		</Slide>
	);
});

function SettingsPanel(props) {
	const { settingsHandlers, onClose, open } = props;
	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="settings-panel"
			aria-describedby="settings"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...settingsHandlers}
		>
			<CustomScrollbars className="p-16 sm:p-32 space-y-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<CustomSvgIcon>heroicons-outline:x</CustomSvgIcon>
				</IconButton>

				<Typography
					className="font-semibold"
					variant="h6"
				>
					Theme Settings
				</Typography>

				<CustomSettings />

				<div className="py-32">
					<CustomSettingsViewerDialog />
				</div>
			</CustomScrollbars>
		</StyledDialog>
	);
}

export default SettingsPanel;
