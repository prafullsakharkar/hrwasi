import _ from '@lodash';
import CustomUtils from '@custom/utils';
import mockApi from '../mock-api.json';

const notesDB = mockApi.components.examples.notes_notes.value;
const labelsDB = mockApi.components.examples.notes_labels.value;
export const notesApiMocks = (mock) => {
	mock.onGet('/notes').reply(() => {
		return [200, _.filter(notesDB, { archived: false })];
	});
	mock.onPost('/notes').reply(({ data }) => {
		const newNote = { id: CustomUtils.generateGUID(), ...JSON.parse(data) };
		notesDB.push(newNote);
		return [200, newNote];
	});
	mock.onGet('/notes/archive').reply(() => {
		return [200, _.filter(notesDB, { archived: true })];
	});
	mock.onGet('/notes/reminders').reply(() => {
		return [200, _.filter(notesDB, (item) => item.reminder && !item.archived)];
	});
	mock.onGet('/notes/labels').reply(() => {
		return [200, labelsDB];
	});
	mock.onPost('/notes/labels').reply(({ data }) => {
		const newLabel = { id: CustomUtils.generateGUID(), ...JSON.parse(data) };
		labelsDB.push(newLabel);
		return [200, newLabel];
	});
	mock.onDelete('/notes/labels/:id').reply((config) => {
		const { id } = config.params;
		_.remove(labelsDB, { id });
		return [200, id];
	});
	mock.onPut('/notes/labels/:id').reply((config) => {
		const { id } = config.params;
		const data = JSON.parse(config.data);
		_.assign(_.find(labelsDB, { id }), data);
		return [200, data];
	});
	mock.onGet('/notes/labels/:id').reply((config) => {
		const { id } = config.params;
		const response = _.filter(notesDB, (item) => item.labels.includes(id) && !item.archived);

		if (response) {
			return [200, response];
		}

		return [404, 'Requested notes do not exist.'];
	});
	mock.onGet('/notes/:id').reply((config) => {
		const { id } = config.params;
		const note = _.find(notesDB, { id });

		if (note) {
			return [200, note];
		}

		return [404, 'Requested task do not exist.'];
	});
	mock.onPut('/notes/:id').reply((config) => {
		const { id } = config.params;
		const data = JSON.parse(config.data);
		_.assign(_.find(notesDB, { id }), data);
		return [200, data];
	});
	mock.onDelete('/notes/:id').reply((config) => {
		const { id } = config.params;
		_.remove(notesDB, { id });
		return [200, id];
	});
};
