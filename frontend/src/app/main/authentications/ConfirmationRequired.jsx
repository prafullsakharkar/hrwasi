import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Logo from 'app/theme-layouts/shared-components/Logo';

function ForgotPasswordPage() {

  return (
    <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
      <Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:w-full md:max-w-6xl">
        <Box
          className="relative h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
          sx={{ backgroundColor: 'primary.main' }}
        >
          <svg
            className="pointer-events-none absolute inset-0"
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              component="g"
              sx={{ color: 'primary.light' }}
              className="opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
            >
              <circle
                r="234"
                cx="196"
                cy="23"
              />
              <circle
                r="234"
                cx="790"
                cy="491"
              />
            </Box>
          </svg>
          <Box
            component="svg"
            className="absolute -right-64 -top-64 opacity-20"
            sx={{ color: 'primary.light' }}
            viewBox="0 0 220 192"
            width="220px"
            height="192px"
            fill="none"
          >
            <defs>
              <pattern
                id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="220"
              height="192"
              fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
            />
          </Box>

          <div className="relative z-10 w-full max-w-2xl">
          <div className="mx-auto w-full">
            <Logo />

            <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight text-gray-100">
							Confirmation required
						</Typography>
						<Typography className="mt-16 text-gray-400">
							A confirmation mail with instructions has been sent to your email address. Follow those
							instructions to confirm your email address and activate your account.
						</Typography>

						<Typography
							className="mt-32 text-md font-medium text-gray-100"
							color="text.secondary"
						>
							<span>Return to </span>
							<Link
								className="text-primary-500 ml-4 hover:underline"
								to="/sign-in"
							>
								sign in
							</Link>
						</Typography>
          </div>            
          </div>
        </Box>

        
      </Paper>
    </div>
  );
}

export default ForgotPasswordPage;
