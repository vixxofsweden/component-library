'use strict';

const express = require('express');
const router = express.Router();
const component = express.Router();
const url = require('url');
const config = require('./config');

let data = {};

router.get('/', (request, response) => {
	response.render('index');
});

component.route('/:component').get((request, response) => {
	let requestUrl = url.parse(request.url);
	let componentName = 'cl-component-' + request.params['component'];
	let query = request.query;
	let pathName = requestUrl.pathname;

	data[componentName] = {
		brand: 'default'
	};

	// TODO: Check that the theme exists
	if (typeof request.query['theme'] != 'undefined' && request.query['theme'] != "") {
		data[componentName].theme = 'cl-theme-' + request.query['theme'];
	}

	data[componentName].component = componentName;

	response.render('component', data[componentName]);
});

module.exports = {
	default: router,
	component: component
};