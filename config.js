"use strict";

const config = {
	env: process.env.NODE_ENV || 'local',
	production: {
		port: process.env.PORT,
		url: process.env.URL
	},
	development: {
		port: process.env.PORT,
		url: process.env.URL
	},
	local: {
		port: 8080,
		url: 'http://localhost:5000/'
	},
	get current() {
		return this[this.env];
	}
}

export default config;