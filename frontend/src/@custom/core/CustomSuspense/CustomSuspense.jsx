import CustomLoading from '@custom/core/CustomLoading';
import { Suspense } from 'react';

/**
 * The CustomSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function CustomSuspense(props) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<CustomLoading {...loadingProps} />}>{children}</Suspense>;
}

export default CustomSuspense;
