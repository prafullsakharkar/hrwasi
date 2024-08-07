import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import CustomNavHorizontalLayout1 from './horizontal/CustomNavHorizontalLayout1';
import CustomNavVerticalLayout1 from './vertical/CustomNavVerticalLayout1';
import CustomNavVerticalLayout2 from './vertical/CustomNavVerticalLayout2';
import CustomNavHorizontalCollapse from './horizontal/types/CustomNavHorizontalCollapse';
import CustomNavHorizontalGroup from './horizontal/types/CustomNavHorizontalGroup';
import CustomNavHorizontalItem from './horizontal/types/CustomNavHorizontalItem';
import CustomNavHorizontalLink from './horizontal/types/CustomNavHorizontalLink';
import CustomNavVerticalCollapse from './vertical/types/CustomNavVerticalCollapse';
import CustomNavVerticalGroup from './vertical/types/CustomNavVerticalGroup';
import CustomNavVerticalItem from './vertical/types/CustomNavVerticalItem';
import CustomNavVerticalLink from './vertical/types/CustomNavVerticalLink';
import { registerComponent } from './CustomNavItem';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .custom-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .custom-list-item-text': {
						padding: '0 0 0 8px'
					}
				},
				'&.dense': {
					'& .custom-list-item': {
						minHeight: 32,
						height: 32,
						'& .custom-list-item-text': {
							padding: '0 0 0 8px'
						}
					}
				}
			}
		})}
	/>
);
/*
Register Custom Navigation Components
 */
registerComponent('vertical-group', CustomNavVerticalGroup);
registerComponent('vertical-collapse', CustomNavVerticalCollapse);
registerComponent('vertical-item', CustomNavVerticalItem);
registerComponent('vertical-link', CustomNavVerticalLink);
registerComponent('horizontal-group', CustomNavHorizontalGroup);
registerComponent('horizontal-collapse', CustomNavHorizontalCollapse);
registerComponent('horizontal-item', CustomNavHorizontalItem);
registerComponent('horizontal-link', CustomNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

/**
 * CustomNavigation
 * Component for displaying a navigation bar which contains CustomNavItem components
 * and acts as parent for providing props to its children components
 */
function CustomNavigation(props) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<CustomNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<CustomNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<CustomNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(CustomNavigation);
