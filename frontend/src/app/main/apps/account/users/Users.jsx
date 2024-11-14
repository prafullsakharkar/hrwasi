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
			<div className="w-full h-full container flex flex-col">
				<UserTable />
			</div>
		</>
	);
}

export default Users;
