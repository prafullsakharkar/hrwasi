import _ from '@lodash';

/**
 *  CustomNavItemModel
 *  Constructs a navigation item based on CustomNavItemType
 */
function CustomNavItemModel(data) {
	data = data || {};
	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default CustomNavItemModel;
