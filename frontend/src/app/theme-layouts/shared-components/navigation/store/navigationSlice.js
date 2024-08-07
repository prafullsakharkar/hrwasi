import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import CustomNavigationHelper from '@custom/utils/CustomNavigationHelper';
import i18next from 'i18next';
import CustomNavItemModel from '@custom/core/CustomNavigation/models/CustomNavItemModel';
import CustomUtils from '@custom/utils';
import navigationConfig from 'app/configs/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState([]);
const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	CustomNavigationHelper.flattenNavigation(navigationConfig)
);
/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem = (item, parentId) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = CustomNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(CustomNavigationHelper.appendNavItem(navigation, CustomNavItemModel(item), parentId)));
	return Promise.resolve();
};
/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem = (item, parentId) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = CustomNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(CustomNavigationHelper.prependNavItem(navigation, CustomNavItemModel(item), parentId)));
	return Promise.resolve();
};
/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem = (id, item) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = CustomNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(CustomNavigationHelper.updateNavItem(navigation, id, item)));
	return Promise.resolve();
};
/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem = (id) => async (dispatch, getState) => {
	const AppState = getState();
	const navigation = CustomNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));
	dispatch(setNavigation(CustomNavigationHelper.removeNavItem(navigation, id)));
	return Promise.resolve();
};
export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state) => state.navigation);
/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action) {
			return navigationAdapter.setAll(state, CustomNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(navigationSlice);
navigationSlice.injectInto(rootReducer);
export const { setNavigation, resetNavigation } = navigationSlice.actions;
export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		const navigation = CustomNavigationHelper.unflattenNavigation(navigationSimple);

		function setAdditionalData(data) {
			return data?.map((item) => ({
				hasPermission: Boolean(CustomUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(navigation);
		return translatedValues;
	}
);
export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return CustomNavigationHelper.flattenNavigation(navigation);
});
export default navigationSlice.reducer;
