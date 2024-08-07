import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { closeDialog, selectCustomDialogProps } from '@custom/core/CustomDialog/customDialogSlice';

/**
 * CustomDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function CustomDialog() {
	const dispatch = useAppDispatch();
	const options = useAppSelector(selectCustomDialogProps);
	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="custom-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default CustomDialog;
