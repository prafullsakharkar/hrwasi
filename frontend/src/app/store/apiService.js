import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
	() =>
		async ({ url, method, data, params }) => {
			try {
				const result = await axios({
					url,
					method,
					data,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					params
				});
				return { data: result.data };
			} catch (axiosError) {
				const error = axiosError;
				return {
					error
				};
			}
		};
export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
	reducerPath: 'apiService'
});
export default apiService;
