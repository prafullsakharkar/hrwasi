import CustomDialog from '@custom/core/CustomDialog';
import { styled } from '@mui/material/styles';
import CustomMessage from '@custom/core/CustomMessage';
import CustomSuspense from '@custom/core/CustomSuspense';
import AppContext from 'app/AppContext';
import clsx from 'clsx';
import { memo, useContext, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { selectCustomCurrentLayoutConfig } from '@custom/core/CustomSettings/customSettingsSlice';
import { useAppSelector } from 'app/store/hooks';
import FooterLayout2 from './components/FooterLayout2';
import LeftSideLayout2 from './components/LeftSideLayout2';
import NavbarWrapperLayout2 from './components/NavbarWrapperLayout2';
import RightSideLayout2 from './components/RightSideLayout2';
import ToolbarLayout2 from './components/ToolbarLayout2';
import Configurator from '../shared-components/configurator/Configurator';

const Root = styled('div')(({ config }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

/**
 * The layout 2.
 */
function Layout2(props) {
	const { children } = props;
	const config = useAppSelector(selectCustomCurrentLayoutConfig);
	const appContext = useContext(AppContext);
	const { routes } = appContext;
	return (
		<Root
			id="custom-layout"
			className="flex w-full"
			config={config}
		>
			{config.leftSidePanel.display && <LeftSideLayout2 />}

			<div className="flex min-w-0 flex-auto flex-col">
				<main
					id="custom-main"
					className="relative flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.navbar.display && (
						<NavbarWrapperLayout2
							className={clsx(config.navbar.style === 'fixed' && 'sticky top-0 z-50')}
						/>
					)}

					{config.toolbar.display && (
						<ToolbarLayout2
							className={clsx(
								config.toolbar.style === 'fixed' && 'sticky top-0',
								config.toolbar.position === 'above' && 'z-40 order-first'
							)}
						/>
					)}

					<div className="sticky top-0 z-99">
						<Configurator />
					</div>

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<CustomSuspense>{useRoutes(routes)}</CustomSuspense>

						<Suspense>
							<CustomDialog />
						</Suspense>
						{children}
					</div>

					{config.footer.display && (
						<FooterLayout2 className={config.footer.style === 'fixed' ? 'sticky bottom-0' : ''} />
					)}
				</main>
			</div>

			{config.rightSidePanel.display && <RightSideLayout2 />}
			<CustomMessage />
		</Root>
	);
}

export default memo(Layout2);
