import CustomScrollbars from '@custom/core/CustomScrollbars';

/**
 * The CustomPageSimpleSidebarContent component is a content container for the CustomPageSimpleSidebar component.
 */
function CustomPageSimpleSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CustomScrollbars enable={innerScroll}>
			<div className="CustomPageSimple-sidebarContent">{children}</div>
		</CustomScrollbars>
	);
}

export default CustomPageSimpleSidebarContent;
