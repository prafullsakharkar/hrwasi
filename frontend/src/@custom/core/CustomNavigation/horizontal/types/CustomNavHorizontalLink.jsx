import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from '@custom/core/withRouter';
import { Link, ListItemButton } from '@mui/material';
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

/*
 * CustomNavHorizontalLink
 * This is a component to render horizontal navigation links in the Custom navigations.
 * It receieves `CustomNavItemComponentProps` and `WithRouterProps` as props.
 */
function CustomNavHorizontalLink(props) {
	const { item, checkPermission } = props;
	let itemProps;
	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('custom-list-item')}
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
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
	);
}

const NavHorizontalLink = withRouter(memo(CustomNavHorizontalLink));
export default NavHorizontalLink;
