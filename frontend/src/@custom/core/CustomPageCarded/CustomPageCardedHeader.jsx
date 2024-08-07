import clsx from 'clsx';

/**
 * The CustomPageCardedHeader component is a header for the CustomPageCarded component.
 */
function CustomPageCardedHeader(props) {
	const { header = null } = props;
	return <div className={clsx('CustomPageCarded-header', 'container')}>{header}</div>;
}

export default CustomPageCardedHeader;
