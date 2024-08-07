import NavLinkAdapter from '@custom/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@custom/core/withRouter';
import { ListItemButton } from '@mui/material';
import CustomNavBadge from '../../CustomNavBadge';
import CustomSvgIcon from '../../../CustomSvgIcon';

const Root = styled(ListItemButton)(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .custom-list-item-text-primary': {
			color: 'inherit'
		},
		'& .custom-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .custom-list-item-icon': {},
	'& .custom-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

/**
 * CustomNavHorizontalItem is a component responsible for rendering the navigation element in the horizontal menu in the Custom theme.
 */
function CustomNavHorizontalItem(props) {
	const { item, checkPermission } = props;
	const component = item.url ? NavLinkAdapter : 'li';
	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url || '',
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('custom-list-item', item.active && 'active')}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<CustomSvgIcon
						className={clsx('custom-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</CustomSvgIcon>
				)}

				<ListItemText
					className="custom-list-item-text"
					primary={item.title}
					classes={{ primary: 'text-13 custom-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<CustomNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
	);
}

const NavHorizontalItem = withRouter(memo(CustomNavHorizontalItem));
export default NavHorizontalItem;
