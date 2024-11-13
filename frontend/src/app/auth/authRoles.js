/**
 * The authRoles object defines the authorization roles for the Custom application.
 */
const authRoles = {
	/**
	 * The admin role grants access to users with the 'admin' role.
	 */
	Admin: ['Admin'],
	/**
	 * The Employee role grants access to users with the 'admin' or 'Employee' role.
	 */
	Client: ['Admin', 'Client'],
	Employee: ['Admin', 'Employee', 'Client'],
	User: ['Admin', 'Employee', 'User', 'Client'],
	/**
	 * The Guest role grants access to unauthenticated users.
	 */
	Guest: []
};
export default authRoles;
