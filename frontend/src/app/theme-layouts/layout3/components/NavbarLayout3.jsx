import CustomScrollbars from '@custom/core/CustomScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from '../../shared-components/navigation/Navigation';

const Root = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary
}));

/**
 * The navbar layout 3.
 */
function NavbarLayout3(props) {
	const { className = '' } = props;
	return (
		<Root className={clsx('h-64 max-h-64 min-h-64 w-full shadow-md', className)}>
			<div className="container flex h-full w-full flex-auto items-center px-16 lg:px-24">
				<CustomScrollbars className="flex h-full items-center">
					<Navigation
						className="w-full"
						layout="horizontal"
						dense
					/>
				</CustomScrollbars>
			</div>
		</Root>
	);
}

export default memo(NavbarLayout3);
