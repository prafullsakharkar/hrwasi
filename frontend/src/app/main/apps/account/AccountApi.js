import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['account_users', 'account_user'];
export const userEndPoint = '/api/v1/account/users/';
const AccountApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getUsers: build.query({
				query: () => ({ url: userEndPoint }),
				providesTags: ['account_users']
			}),
			deleteUsers: build.mutation({
				query: (userIds) => ({
					url: userEndPoint,
					method: 'DELETE',
					data: userIds
				}),
				invalidatesTags: ['account_users']
			}),
			getUser: build.query({
				query: (userId) => ({
					url: userEndPoint + userId + '/'
				}),
				providesTags: ['account_user', 'account_users']
			}),
			createUser: build.mutation({
				query: (newUser) => ({
					url: userEndPoint,
					method: 'POST',
					data: newUser
				}),
				invalidatesTags: ['account_users', 'account_user']
			}),
			updateUser: build.mutation({
				query: (user) => ({
					url: userEndPoint + user.id + '/',
					method: 'PATCH',
					data: user
				}),
				invalidatesTags: ['account_user', 'account_users']
			}),
			deleteUser: build.mutation({
				query: (userId) => ({
					url: userEndPoint + userId + '/',
					method: 'DELETE'
				}),
				invalidatesTags: ['account_user', 'account_users']
			}),
		}),
		overrideExisting: false
	});
export default AccountApi;
export const {
	useGetUsersQuery,
	useDeleteUsersMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useCreateUserMutation
} = AccountApi;
