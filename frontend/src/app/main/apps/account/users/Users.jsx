import GlobalStyles from '@mui/material/GlobalStyles';
import UserTable from './UserTable';

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
			<UserTable />
		</>
	);
}

export default Users;
