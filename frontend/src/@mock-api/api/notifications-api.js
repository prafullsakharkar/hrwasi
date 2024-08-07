import _ from '@lodash';
import CustomUtils from '@custom/utils';
import NotificationModel from 'src/app/main/apps/notifications/models/NotificationModel';
import mockApi from '../mock-api.json';

let notificationsDB = mockApi.components.examples.notifications.value;
export const notificationsApiMocks = (mock) => {
	mock.onGet('/notifications').reply(() => [200, notificationsDB]);
	mock.onDelete('/notifications').reply(() => {
		notificationsDB = [];
		return [200];
	});
	mock.onPost('/notifications').reply((config) => {
		const newNotification = NotificationModel({
			id: CustomUtils.generateGUID(),
			...JSON.parse(config.data)
		});
		notificationsDB.push(newNotification);
		return [200, newNotification];
	});
	mock.onDelete('/notifications/:id').reply((config) => {
		const { id } = config.params;
		_.remove(notificationsDB, { id });
		return [200, id];
	});
};
