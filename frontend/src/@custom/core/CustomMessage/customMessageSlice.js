import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
/**
 * The initial state of the message slice.
 */
const initialState = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};
/**
 * The Message slice.
 */
export const customMessageSlice = createSlice({
	name: 'customMessage',
	initialState,
	reducers: {
		showMessage(state, action) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	},
	selectors: {
		selectCustomMessageState: (customMessage) => customMessage.state,
		selectCustomMessageOptions: (customMessage) => customMessage.options
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(customMessageSlice);
const injectedSlice = customMessageSlice.injectInto(rootReducer);
export const { hideMessage, showMessage } = customMessageSlice.actions;
export const { selectCustomMessageOptions, selectCustomMessageState } = injectedSlice.selectors;
export default customMessageSlice.reducer;
