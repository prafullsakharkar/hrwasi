import CustomScrollbars from '@custom/core/CustomScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import CustomPageSimpleHeader from './CustomPageSimpleHeader';
import CustomPageSimpleSidebar from './CustomPageSimpleSidebar';

const headerHeight = 120;
const toolbarHeight = 64;
/**
 * The Root styled component is the top-level container for the CustomPageSimple component.
 */
const Root = styled('div')(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: 'auto',
	backgroundColor: theme.palette.background.default,
	'&.CustomPageSimple-scroll-content': {
		height: '100%'
	},
	'& .CustomPageSimple-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default,
		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden'
		})
	},
	'& .CustomPageSimple-header': {
		display: 'flex',
		flex: '0 0 auto',
		backgroundSize: 'cover'
	},
	'& .CustomPageSimple-topBg': {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		pointerEvents: 'none'
	},
	'& .CustomPageSimple-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: '1 1 auto',
		overflow: 'hidden',
		//    WebkitOverflowScrolling: 'touch',
		zIndex: 9999
	},
	'& .CustomPageSimple-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},
	'& .CustomPageSimple-content': {
		display: 'flex',
		flex: '1 1 auto',
		alignItems: 'start',
		minHeight: 0,
		overflowY: 'auto'
	},
	'& .CustomPageSimple-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),
					'&.CustomPageSimple-leftSidebar': {
						marginLeft: -props.leftSidebarWidth
					},
					'&.CustomPageSimple-rightSidebar': {
						marginRight: -props.rightSidebarWidth
					}
				}
			}
		}
	},
	'& .CustomPageSimple-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative'
			}
		},
		maxWidth: '100%',
		height: '100%'
	},
	'& .CustomPageSimple-leftSidebar': {
		width: props.leftSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: 0
		}
	},
	'& .CustomPageSimple-rightSidebar': {
		width: props.rightSidebarWidth,
		[theme.breakpoints.up('lg')]: {
			borderLeft: `1px solid ${theme.palette.divider}`,
			borderRight: 0
		}
	},
	'& .CustomPageSimple-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	'& .CustomPageSimple-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},
	'& .CustomPageSimple-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%'
	},
	'& .CustomPageSimple-backdrop': {
		position: 'absolute'
	}
}));
/**
 * The CustomPageSimple component is a layout component that provides a simple page layout with a header, left sidebar, right sidebar, and content area.
 * It is designed to be used as a top-level component for an application or as a sub-component within a larger layout.
 */
const CustomPageSimple = forwardRef((props, ref) => {
	const {
		scroll = 'page',
		className,
		header,
		content,
		leftSidebarContent,
		rightSidebarContent,
		leftSidebarOpen = false,
		rightSidebarOpen = false,
		rightSidebarWidth = 240,
		leftSidebarWidth = 240,
		leftSidebarVariant = 'permanent',
		rightSidebarVariant = 'permanent',
		rightSidebarOnClose,
		leftSidebarOnClose
	} = props;
	const leftSidebarRef = useRef(null);
	const rightSidebarRef = useRef(null);
	const rootRef = useRef(null);
	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: (val) => {
			leftSidebarRef?.current?.toggleSidebar(val);
		},
		toggleRightSidebar: (val) => {
			rightSidebarRef?.current?.toggleSidebar(val);
		}
	}));
	return (
		<>
			<GlobalStyles
				styles={() => ({
					...(scroll !== 'page' && {
						'#custom-toolbar': {
							position: 'static'
						},
						'#custom-footer': {
							position: 'static'
						}
					}),
					...(scroll === 'page' && {
						'#custom-toolbar': {
							position: 'sticky',
							top: 0
						},
						'#custom-footer': {
							position: 'sticky',
							bottom: 0
						}
					})
				})}
			/>
			<Root
				className={clsx('CustomPageSimple-root', `CustomPageSimple-scroll-${scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				<div className="z-10 flex h-full flex-auto flex-col">
					<div className="CustomPageSimple-wrapper">
						{leftSidebarContent && (
							<CustomPageSimpleSidebar
								position="left"
								variant={leftSidebarVariant || 'permanent'}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</CustomPageSimpleSidebar>
						)}
						<div className="CustomPageSimple-contentWrapper">
							{header && <CustomPageSimpleHeader header={header} />}

							{content && (
								<CustomScrollbars
									enable={scroll === 'content'}
									className={clsx('CustomPageSimple-content container')}
								>
									{content}
								</CustomScrollbars>
							)}
						</div>
						{rightSidebarContent && (
							<CustomPageSimpleSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</CustomPageSimpleSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
});
export default memo(styled(CustomPageSimple)``);
