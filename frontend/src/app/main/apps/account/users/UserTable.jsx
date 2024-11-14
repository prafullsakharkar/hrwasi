import React from 'react';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import _ from '@lodash';
import { useDispatch } from 'react-redux';
import { Box, IconButton, Paper, Button, Tooltip, Autocomplete, TextField, Checkbox, FormControlLabel, Badge, Stack } from '@mui/material';
// import ChangePasswordMenu from './ChangePasswordMenu';
import { useState, useEffect } from 'react';
import CustomSvgIcon from '@custom/core/CustomSvgIcon';
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation, useCreateUserMutation } from '../AccountApi';
import CustomLoading from '@custom/core/CustomLoading';
import DataTable from 'app/shared-components/data-table/DataTable';
import { showMessage } from '@custom/core/CustomMessage/customMessageSlice';

function UserTable(props) {
	const dispatch = useDispatch();
	const [activeUser, setActiveUser] = useState(true);
	const { data: users, isLoading } = useGetUsersQuery({ is_active: activeUser });
	const [deleteUser] = useDeleteUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const [createUser] = useCreateUserMutation();

	const [validationErrors, setValidationErrors] = useState({});
	const [editedUsers, setEditedUsers] = useState({});

	const roles = ["Admin", "Client", "User", "Employee"]

	const validateRequired = (value) => !!value.length;
	const validateEmail = (email) =>
		!!email.length &&
		email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			);

	const validateExists = (key, value) => users.length && _.find(users, { [key]: value });

	function validateUser(user) {
		const validate = {}
		validate.username = user.hasOwnProperty('username') && (
			!validateRequired(user?.username)
				? 'Login is Required' : validateExists("username", user?.username)
					? 'Login already exists' : ''
		)
		validate.first_name = user.hasOwnProperty('first_name') && (
			!validateRequired(user?.first_name)
				? 'First Name is Required'
				: ''
		)
		// validate.last_name = user.hasOwnProperty('last_name') && !validateRequired(user?.last_name) ? 'Last Name is Required' : ''
		validate.email = user.hasOwnProperty('email') && (
			!validateEmail(user?.email)
				? 'Incorrect Email Format' : validateExists("email", user?.email)
					? "Email already exists" : ''
		)
		validate.is_active = user.hasOwnProperty('is_active') && !validateRequired(user?.is_active) ? 'Incorrect Active' : ''
		validate.role = user.hasOwnProperty('role') && !validateRequired(user?.role) ? 'Role is Required' : ''
		return validate
	}

	const rowCancel = (table) => {
		table.setEditingRow(null); //exit editing mode
		table.setCreatingRow(false);
		setEditedUsers({})
		setValidationErrors({});
	}

	const showAddUser = (table) => {
		rowCancel(table);
		setEditedUsers({ is_active: "true", role: "user" });
		table.setCreatingRow(true);
	}

	//CREATE action
	const handleCreateUser = async ({ values, table }) => {
		if (Object.keys(values).length) {
			const newValidationErrors = validateUser(values);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			editedUsers.password = "Welcome@tom2024"
			createUser(editedUsers).then(() => {
				dispatch(
					showMessage({
						message: 'User has been created successfully!',
						variant: 'success'
					})
				);
			});
		}
		rowCancel(table)
	};

	//UPDATE action
	const handleSaveUser = async ({ values, table }) => {
		if (Object.keys(editedUsers).length) {
			const newValidationErrors = validateUser(editedUsers);
			if (Object.values(newValidationErrors).some((error) => error)) {
				setValidationErrors(newValidationErrors);
				return;
			}
			editedUsers.id = values.id
			updateUser(editedUsers);
		}
		rowCancel(table)
	};

	//DELETE action
	const openDeleteConfirmModal = (row) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			deleteUser(row.original.id);
		}
	};

	const columns = React.useMemo(
		() => [
			{
				header: 'Id',
				accessorKey: 'id',
				size: 60,
				grow: true,
				enableEditing: false,
				enableColumnFilter: false,
			},
			{
				header: 'Active',
				accessorKey: 'is_active',
				grow: true,
				size: 48,
				filterVariant: 'select',
				filterSelectOptions: ["true", "false"],
				Cell: ({ cell }) => (
					cell.getValue() ? (
						<Icon className="text-green text-20">check_circle</Icon>
					) : (
						<Icon className="text-red text-20">remove_circle</Icon>
					)
				),
				editVariant: 'select',
				editSelectOptions: ["true", "false"],
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					select: true,
					error: !!validationErrors?.is_active,
					helperText: validationErrors?.is_active,
					onChange: (event) => setEditedUsers({
						...editedUsers,
						is_active: event.target.value

					})
				}),
			},
			{
				header: 'Login',
				accessorKey: 'username',
				size: 120,
				grow: true,
				// enableEditing: false,
				Cell: ({ renderedCellValue, row }) => (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
						}}
					>
						{row?.original?.is_active === false ? <Badge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<CustomSvgIcon size={12}>heroicons-outline:ban</CustomSvgIcon>
							}
						>
							<Avatar alt={row?.original?.name} src={row?.original?.avatar} sx={{ width: 32, height: 32 }} />
						</Badge> : <Avatar alt={row?.original?.name} src={row?.original?.avatar} sx={{ width: 32, height: 32 }} />
						}
						<span>{renderedCellValue}</span>
					</Box>
				),
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					required: true,
					error: !!validationErrors?.username,
					helperText: validationErrors?.username,
					onChange: (event) => {
						event.preventDefault();
						setEditedUsers({
							...editedUsers,
							username: event.target.value
						})
					},
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							username: undefined,
						}),
				}),
			},
			{
				header: 'First Name',
				accessorKey: 'first_name',
				size: 150,
				grow: true,
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					required: true,
					error: !!validationErrors?.first_name,
					helperText: validationErrors?.first_name,
					onChange: (event) => {
						event.preventDefault();
						setEditedUsers({
							...editedUsers,
							first_name: event.target.value
						})
					},
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							first_name: undefined,
						}),
				}),
			},
			{
				header: 'Last Name',
				accessorKey: 'last_name',
				size: 150,
				grow: true,
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					required: true,
					error: !!validationErrors?.last_name,
					helperText: validationErrors?.last_name,
					onChange: (event) => setEditedUsers({
						...editedUsers,
						last_name: event.target.value
					}),
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							last_name: undefined,
						}),
				}),
			},
			{
				header: 'Role',
				accessorKey: 'role',
				size: 150,
				grow: true,
				filterVariant: 'autocomplete',
				filterSelectOptions: roles,
				editVariant: 'autocomplete',
				editSelectOptions: roles,
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					select: true,
					error: !!validationErrors?.role,
					helperText: validationErrors?.role,
					onChange: (event) => setEditedUsers({
						...editedUsers,
						role: event.target.value
					}),
				}),
			},
			{
				header: 'Email',
				accessorKey: 'email',
				size: 200,
				grow: true,
				muiEditTextFieldProps: ({ row }) => ({
					key: row.id,
					type: 'email',
					required: true,
					error: !!validationErrors?.email,
					helperText: validationErrors?.email,
					onChange: (event) => setEditedUsers({
						...editedUsers,
						email: event.target.value
					}),
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							email: undefined,
						}),
				}),
			},
			{
				header: 'Joining Date',
				accessorKey: 'date_joined',
				grow: true,
				enableEditing: false,
				enableColumnFilter: false,
			},
			{
				header: 'Last Login',
				accessorKey: 'last_login',
				grow: true,
				enableEditing: false,
				enableColumnFilter: false,
			},
		],
		[validationErrors]
	);

	if (isLoading) {
		return <CustomLoading />;
	}
	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				data={users}
				columns={columns}
				isLoading={isLoading}
				createDisplayMode='modal'
				editDisplayMode='row'
				enableEditing={true}
				enableRowSelection={true}
				getRowId={(row) => row.id}
				onCreatingRowCancel={() => rowCancel}
				onCreatingRowSave={handleCreateUser}
				onEditingRowCancel={() => rowCancel}
				onEditingRowSave={handleSaveUser}
				removeEntry={deleteUser}
				createEntry={showAddUser}
				renderRowActions={
					({ row, table }) => (
						<Box sx={{ display: 'flex', gap: '1rem' }}>
							<Tooltip title="Edit">
								<IconButton color="warning" onClick={() => {
									rowCancel(table)
									table.setEditingRow(row)
								}}>
									<CustomSvgIcon size={20}>heroicons-outline:pencil-alt</CustomSvgIcon>
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete">
								<IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
									<CustomSvgIcon size={20}>heroicons-outline:trash</CustomSvgIcon>
								</IconButton>
							</Tooltip>
							{/* <ChangePasswordMenu id={row.original.id} /> */}
						</Box>
					)}
				renderTopToolbarCustomActions={({ table }) => {
					return (
						<Stack direction="row" spacing={1}>
							<FormControlLabel control={<Checkbox
								size="small"
								label="Select Inactive Users"
								color='secondary'
								checked={!activeUser}
								onChange={() => setActiveUser(!activeUser)} />} label="Show Inactive" sx={{ marginLeft: '2px' }}
							/>
						</Stack>
					);
				}}
			/>
		</Paper>
	)
}

export default UserTable;
