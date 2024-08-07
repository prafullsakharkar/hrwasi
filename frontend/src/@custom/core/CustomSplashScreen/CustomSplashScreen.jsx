import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * The CustomSplashScreen component is responsible for rendering a splash screen with a logo and a loading spinner.
 * It uses various MUI components to render the logo and spinner.
 * The component is memoized to prevent unnecessary re-renders.
 */
function CustomSplashScreen() {
	return (
		<div id="custom-splash-screen">
			<div className="logo">
				<img
					width="128"
					src="assets/images/logo/mwt.png"
					alt="logo"
				/>
			</div>
			<Box
				id="spinner"
				sx={{
					'& > div': {
						backgroundColor: 'palette.secondary.main'
					}
				}}
			>
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</Box>
		</div>
	);
}

export default memo(CustomSplashScreen);
