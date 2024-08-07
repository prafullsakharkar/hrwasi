import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useParams, useNavigate } from 'react-router-dom';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from 'app/store/hooks';
import useJwtAuth from '../useJwtAuth';
import { showMessage } from '@custom/core/CustomMessage/customMessageSlice';
/**
 * Form Validation Schema
 */
const schema = z
	.object({
		new_password: z
			.string()
			.nonempty('Please enter your new_password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		re_new_password: z.string().nonempty('Password confirmation is required')
	})
	.refine((data) => data.new_password === data.re_new_password, {
		message: 'Passwords must match',
		path: ['re_new_password']
	});
const defaultValues = {
	new_password: '',
	re_new_password: ''
};

/**
 * The modern reset new_password page.
 */
function ResetPasswordForm() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const routeParams = useParams();
	const { resetPassword } = useJwtAuth();
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	function onSubmit({ new_password, re_new_password }) {
		routeParams.new_password = new_password;
		routeParams.re_new_password = re_new_password;
		
		resetPassword(routeParams).then(() => {
			dispatch(
				showMessage({
					message: 'Password has been reset successfully!',
					variant: 'success'
				})
			);
			reset(defaultValues);
			navigate('/sign-in');
		}).catch(() => {
			dispatch(
				showMessage({
					message: 'This password link is expired!',
					variant: 'error'
				})
			);
		});
	}


	return (
		<form
			name="resetPasswordForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="new_password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Password"
						type="password"
						error={!!errors.new_password}
						helperText={errors?.new_password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="re_new_password"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Password (Confirm)"
						type="password"
						error={!!errors.re_new_password}
						helperText={errors?.re_new_password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className=" mt-4 w-full"
				aria-label="Register"
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="large"
			>
				Reset your password
			</Button>

			<Typography
				className="mt-32 text-md font-medium"
				color="text.secondary"
			>
				<span>Return to</span>
				<Link
					className="ml-4"
					to="/sign-in"
				>
					sign in
				</Link>
			</Typography>
		</form>
	);
}

export default ResetPasswordForm;
