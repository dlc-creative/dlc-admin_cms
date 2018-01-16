"use strict";

export function getClients(clients) {
	return {
		type: 'GET_CLIENTS',
		payload: clients
	}
}

export function getProjects(projects) {
	return {
		type: 'GET_PROJECTS',
		payload: projects
	}
}

export function getData(d1) {
	console.log('d1', d1);
}

export function createProject() {

}

export function changeSelectInput(type, name, input) {
	return {
		type: type,
		name: name,
		payload: input
	}
}