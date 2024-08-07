import NavLinkAdapter from '@custom/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { ListItemButton } from '@mui/material';
import CustomNavBadge from '../../CustomNavBadge';
import CustomSvgIcon from '../../../CustomSvgIcon';

const Root = styled(Box)(({ theme }) => ({
	'& > .custom-list-item': {
		minHeight: 100,
		height: 100,
		width: 100,
		borderRadius: 12,
		margin: '0 0 4px 0',
		color: alpha(theme.palette.text.primary, 0.7),
		cursor: 'pointer',
		textDecoration: 'none!important',
		padding: 0,
		'&.dense': {
			minHeight: 52,
			height: 52,
			width: 52
		},
		'&.type-divider': {
			padding: 0,
			height: 2,
			minHeight: 2,
			margin: '12px 0',
			backgroundColor:
				theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none'
		},
		'&:hover': {
			color: theme.palette.text.primary
		},
		'&.active': {
			color: theme.palette.text.primary,
			backgroundColor:
				theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
			// pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .custom-list-item-text-primary': {
				color: 'inherit'
			},
			'& .custom-list-item-icon': {
				color: 'inherit'
			}
		},
		'& .custom-list-item-icon': {
			color: 'inherit'
		},
		'& .custom-list-item-text': {}
	}
}));

/**
 *  The `CustomNavVerticalTab` component renders vertical navigation item with an adaptable
 *  layout to be used within the `CustomNavigation`. It only supports the `type`s of 'item',
 *  'selection' and 'divider'
 * */
function CustomNavVerticalTab(props) {
	const { item, onItemClick, firstLevel, dense, selectedId, checkPermission } = props;
	const component = item.url ? NavLinkAdapter : 'li';
	let itemProps = {};

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root sx={item.sx}>
				<ListItemButton
					component={component}
					className={clsx(
						`type-${item.type}`,
						dense && 'dense',
						selectedId === item.id && 'active',
						'custom-list-item flex flex-col items-center justify-center p-12'
					)}
					onClick={() => onItemClick && onItemClick(item)}
					{...itemProps}
				>
					{dense ? (
						<Tooltip
							title={item.title || ''}
							placement="right"
						>
							<div className="relative flex h-32 min-h-32 w-32 items-center justify-center">
								{item.icon ? (
									<CustomSvgIcon
										className={clsx('custom-list-item-icon', item.iconClass)}
										color="action"
									>
										{item.icon}
									</CustomSvgIcon>
								) : (
									item.title && <div className="text-16 font-bold">{item.title[0]}</div>
								)}
								{item.badge && (
									<CustomNavBadge
										badge={item.badge}
										className="absolute top-0 h-16 min-w-16 justify-center p-4 ltr:right-0 rtl:left-0"
									/>
								)}
							</div>
						</Tooltip>
					) : (
						<>
							<div className="relative mb-8 flex h-32 min-h-32 w-32 items-center justify-center">
								{item.icon ? (
									<CustomSvgIcon
										size={32}
										className={clsx('custom-list-item-icon', item.iconClass)}
										color="action"
									>
										{item.icon}
									</CustomSvgIcon>
								) : (
									item.title && <div className="text-20 font-bold">{item.title[0]}</div>
								)}
								{item.badge && (
									<CustomNavBadge
										badge={item.badge}
										className="absolute top-0 h-16 min-w-16 justify-center p-4 ltr:right-0 rtl:left-0"
									/>
								)}
							</div>

							<ListItemText
								className="custom-list-item-text w-full grow-0"
								primary={item.title}
								classes={{
									primary:
										'text-12 font-medium custom-list-item-text-primary truncate text-center truncate'
								}}
							/>
						</>
					)}
				</ListItemButton>
				{!firstLevel &&
					item.children &&
					item.children.map((_item) => (
						<NavVerticalTab
							key={_item.id}
							type={`vertical-${_item.type}`}
							item={_item}
							nestedLevel={0}
							onItemClick={onItemClick}
							dense={dense}
							selectedId={selectedId}
							checkPermission={checkPermission}
						/>
					))}
			</Root>
		),
		[firstLevel, item, onItemClick, dense, selectedId]
	);
}

const NavVerticalTab = CustomNavVerticalTab;
export default NavVerticalTab;
