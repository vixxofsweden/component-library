var timer = require("grunt-timer");
module.exports = function(grunt) {
	require('load-grunt-config')(grunt);
	timer.init(grunt);
};