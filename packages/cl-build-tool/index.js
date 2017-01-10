'use strict';

var path = require('path'),
    _ = require('underscore'),
    fs = require('fs'),
	utils = require('./lib/utils.js');

module.exports = function(grunt) {

	var currentPluginDir = path.join(process.cwd(), 'node_modules', 'cl-build-tool');

	// Load config files for Grunt
	require('load-grunt-config')(grunt, {
	    loadGruntTasks: false,
	    configPath: path.join(currentPluginDir, 'grunt/configs')
	});

	// Hacky
	var pkg = grunt.file.readJSON(path.join(currentPluginDir, 'package.json'));
	var deps = JSON.stringify(pkg.dependencies) + JSON.stringify(pkg.devDependencies);

	// Load grunt tasks from package.json/node_modules
	_.each(fs.readdirSync(path.join(__dirname, 'node_modules')), function (module) {
	    if (utils.startsWith(module, 'grunt-') && deps.indexOf(module) > -1) {
	        grunt.loadNpmTasks(path.join(path.basename(__dirname), 'node_modules', module));
	    }
	});

	grunt.loadTasks(path.join(currentPluginDir, 'grunt/tasks'));
	grunt.registerTask('component:style', ['less:component']);
	grunt.registerTask('component:docs', ['assemble:component']);
	grunt.registerTask('theme:style', ['less:theme']);

};