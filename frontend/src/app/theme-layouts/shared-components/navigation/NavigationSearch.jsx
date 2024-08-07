import CustomSearch from '@custom/core/CustomSearch';
import withSlices from 'app/store/withSlices';
import { useAppSelector } from 'app/store/hooks';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';

/**
 * The navigation search.
 */
function NavigationSearch(props) {
	const { variant, className } = props;
	const navigation = useAppSelector(selectFlatNavigation);
	return (
		<CustomSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

export default withSlices([navigationSlice])(NavigationSearch);
