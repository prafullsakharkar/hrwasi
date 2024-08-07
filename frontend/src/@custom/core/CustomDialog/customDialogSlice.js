import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the dialog slice.
 */
const initialState = {
	open: false,
	children: ''
};
/**
 * The Custom Dialog slice
 */
export const customDialogSlice = createSlice({
	name: 'customDialog',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	},
	selectors: {
		selectCustomDialogState: (customDialog) => customDialog.open,
		selectCustomDialogProps: (customDialog) => customDialog
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(customDialogSlice);
const injectedSlice = customDialogSlice.injectInto(rootReducer);
export const { closeDialog, openDialog } = customDialogSlice.actions;
export const { selectCustomDialogState, selectCustomDialogProps } = injectedSlice.selectors;
export default customDialogSlice.reducer;
