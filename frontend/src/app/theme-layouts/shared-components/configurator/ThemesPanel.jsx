import CustomScrollbars from '@custom/core/CustomScrollbars';
import IconButton from '@mui/material/IconButton';
import CustomSvgIcon from '@custom/core/CustomSvgIcon';
import Typography from '@mui/material/Typography';
import CustomThemeSelector from '@custom/core/CustomThemeSelector/CustomThemeSelector';
import { changeCustomTheme } from '@custom/core/CustomSettings/customSettingsSlice';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { useAppDispatch } from 'app/store/hooks';
import themeOptions from 'app/configs/themeOptions';
import { showMessage } from '@custom/core/CustomMessage/customMessageSlice';

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

function ThemesPanel(props) {
	const { schemesHandlers, onClose, open } = props;
	const dispatch = useAppDispatch();

	function handleThemeSelect(_theme) {
		dispatch(changeCustomTheme(_theme?.section)).then(() => {
			dispatch(showMessage({ message: 'User theme selection saved with the api' }));
		});
	}

	return (
		<StyledDialog
			TransitionComponent={Transition}
			aria-labelledby="schemes-panel"
			aria-describedby="schemes"
			open={open}
			onClose={onClose}
			BackdropProps={{ invisible: true }}
			classes={{
				paper: 'shadow-lg'
			}}
			{...schemesHandlers}
		>
			<CustomScrollbars className="p-16 sm:p-32">
				<IconButton
					className="fixed top-0 z-10 ltr:right-0 rtl:left-0"
					onClick={onClose}
					size="large"
				>
					<CustomSvgIcon>heroicons-outline:x</CustomSvgIcon>
				</IconButton>

				<Typography
					className="mb-32"
					variant="h6"
				>
					Theme Color Options
				</Typography>

				<Typography
					className="mb-24 text-justify text-12 italic"
					color="text.secondary"
				>
					* Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also
					create your own theme options and color schemes.
				</Typography>

				<CustomThemeSelector
					options={themeOptions}
					onSelect={handleThemeSelect}
				/>
			</CustomScrollbars>
		</StyledDialog>
	);
}

export default ThemesPanel;
