import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from 'app/store/hooks';
import useJwtAuth from '../useJwtAuth';
import { showMessage } from '@custom/core/CustomMessage/customMessageSlice';
/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email')
});
const defaultValues = {
	email: ''
};

/**
 * The modern forgot password page.
 */
function ForgotPasswordForm() {
	const dispatch = useAppDispatch();
	const { forgotPassword } = useJwtAuth();
	const { control, formState, handleSubmit, setValue, setError, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	function onSubmit(formData) {
		const { email } = formData;
		forgotPassword({
			email,
		}).then(() => {
			reset(defaultValues);
			dispatch(
				showMessage({
				  message: 'Password reset link sent successfully!',
				  variant: 'success'
				})
			  );
		}).catch((error) => {
			const errorData = error.response.data;
			errorData.forEach((err) => {
				setError("email", {
					type: 'manual',
					message: err
				});
			});
		});
	}

	return (
		<form
			name="forgotPasswordForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Email"
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
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
				Send reset link
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

export default ForgotPasswordForm;
