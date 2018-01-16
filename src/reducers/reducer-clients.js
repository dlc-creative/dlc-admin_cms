"use strict";

import _ from 'lodash';

export default function Clients(state = [], action) {
	switch (action.type) {
		case 'GET_CLIENTS':
			return action.payload;
			break;
		default:
			break;
	}
	return state;
}