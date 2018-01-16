"use strict";

import _ from 'lodash';

var initialState = [{
	id: 1,
	project: '',
	type: '',
	client: '',
	budget: '',
	deadline: '',
	status: 'initial'
}];

export default function Projects(state = [], action) {
	switch (action.type) {
		case 'GET_PROJECTS':
			return action.payload;
			break;
		case 'CREATE_PROJECT':
		var newState = [
				...state,
				action.payload
			];
			return newState;
			// return Object.assign({}, initialState, {
			// 	id: _.get(action, 'projects.properties.data.id', ''),
			// 	project: _.get(action, 'projects.properties.data.project', ''),
			// 	type: _.get(action, 'projects.properties.data.type', ''),
			// 	client: _.get(action, 'projects.properties.data.client', ''),
			// 	budget: _.get(action, 'projects.data.properties.budget', ''),
			// 	deadline: _.get(action, 'projects.data.properties.deadline', '')
			// });
			break;
		case 'MODIFY_PROJECT':
			var newState = Object.assign({}, initialState);
			newState[action.name] = action.payload;
			state[newState];
			return state;
			break;
		case 'REMOVE_PROJECT':
			var newState = state.filter((project) => { return project.id !== action.id });
			if (newState.length) {
				return newState
			} else {
				return [];
			}
			break;
		case 'RECEIVE_PROJECT':
			return Object.assign({}, initialState, {
				id: _.get(action, 'projects.properties.data.id', ''),
				project: _.get(action, 'projects.properties.data.project', ''),
				type: _.get(action, 'projects.properties.data.type', ''),
				client: _.get(action, 'projects.properties.data.client', ''),
				budget: _.get(action, 'projects.data.properties.budget', ''),
				deadline: _.get(action, 'projects.data.properties.deadline', ''),
				status: _.get(action, 'projects.data.properties.status', 'initial')
			});
			break;
		case 'RESET_PROJECT':
			return state;
			break;
		default:
			break;
	}
	return state;
}
