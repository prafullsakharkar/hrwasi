import GlobalStyles from '@mui/material/GlobalStyles';
import UsersHeader from './UsersHeader';
import UserList from './UserList';

/**
 * The products page.
 */
function Users() {
	return (
		<>
			<GlobalStyles
				styles={() => ({
					'#root': {
						maxHeight: '100vh'
					}
				})}
			/>
			<div className="w-full h-full container flex flex-col">
				{/* <UsersHeader /> */}
				{/* <UsersTable /> */}
				<UserList />
			</div>
		</>
	);
}

export default Users;
