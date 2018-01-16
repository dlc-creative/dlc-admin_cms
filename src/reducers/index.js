"use strict";

import {combineReducers} from 'redux';
import ClientsReducer from './reducer-clients';
import ProjectsReducer from './reducer-projects';

const allReducers = combineReducers({
	clients: ClientsReducer,
	projects: ProjectsReducer
});

export default allReducers;