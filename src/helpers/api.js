"use strict";

console.log('window location hostname', window.location.hostname);

const BASE_API_PORT = 5000;
const BASE_API_URL = `${window.location.protocol}//${window.location.hostname}:${BASE_API_PORT}/`;

console.log('base api', BASE_API_URL);

export function buildUrl(path) {
	if (path === undefined || path === null) {
		path = '';
	}
	return BASE_API_URL + path;
}

export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
