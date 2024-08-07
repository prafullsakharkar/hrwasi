import CustomScrollbars from '@custom/core/CustomScrollbars';

/**
 * The CustomPageCardedSidebarContent component is a content container for the CustomPageCardedSidebar component.
 */
function CustomPageCardedSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CustomScrollbars enable={innerScroll}>
			<div className="CustomPageCarded-sidebarContent">{children}</div>
		</CustomScrollbars>
	);
}

export default CustomPageCardedSidebarContent;
