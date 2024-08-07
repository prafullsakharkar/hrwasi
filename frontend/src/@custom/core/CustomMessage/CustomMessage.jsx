import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { hideMessage, selectCustomMessageOptions, selectCustomMessageState } from '@custom/core/CustomMessage/customMessageSlice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import CustomSvgIcon from '../CustomSvgIcon';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
	'& .CustomMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF'
		}),
		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark)
		}),
		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF'
		}),
		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF'
		})
	}
}));
const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * CustomMessage
 * The CustomMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function CustomMessage() {
	const dispatch = useAppDispatch();
	const state = useAppSelector(selectCustomMessageState);
	const options = useAppSelector(selectCustomMessageOptions);
	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="CustomMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<CustomSvgIcon color="inherit">{variantIcon[options.variant]}</CustomSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<CustomSvgIcon>heroicons-outline:x</CustomSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default memo(CustomMessage);
