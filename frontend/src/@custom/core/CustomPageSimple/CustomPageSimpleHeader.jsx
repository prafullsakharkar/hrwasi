import clsx from 'clsx';

/**
 * The CustomPageSimpleHeader component is a sub-component of the CustomPageSimple layout component.
 * It provides a header area for the layout.
 */
function CustomPageSimpleHeader(props) {
	const { header = null, className } = props;
	return (
		<div className={clsx('CustomPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default CustomPageSimpleHeader;
