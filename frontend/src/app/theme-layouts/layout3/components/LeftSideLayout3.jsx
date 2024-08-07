import CustomSidePanel from '@custom/core/CustomSidePanel';
import { memo } from 'react';
import NavigationShortcuts from '../../shared-components/navigation/NavigationShortcuts';

/**
 * The left side layout 3.
 */
function LeftSideLayout3() {
	return (
		<CustomSidePanel>
			<NavigationShortcuts
				className="px-8 py-16"
				variant="vertical"
			/>
		</CustomSidePanel>
	);
}

export default memo(LeftSideLayout3);
