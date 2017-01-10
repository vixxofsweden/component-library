'use strict';

var path = require('path'),
    _ = require('underscore'),
    fs = require('fs');

module.exports = function(grunt, options) {

	var currentPluginDir = path.join(process.cwd(), 'node_modules', 'sg-build-tool');

	// Load config files for Grunt
	require('load-grunt-config')(grunt, {
	    loadGruntTasks: false,
	    configPath: path.join(currentPluginDir, 'grunt/configs')
	});

	// Hacky
	var pkg = grunt.file.readJSON(path.join(currentPluginDir, 'package.json'));
	var deps = JSON.stringify(pkg.dependencies);
	deps = deps + JSON.stringify(pkg.devDependencies);

	function startsWith(str, preffix) {
	    if (str) {
	        return str.substring(0, preffix.length) === preffix
	    }
	}

	// Load grunt tasks from package.json/node_modules
	_.each(fs.readdirSync(path.join(__dirname, 'node_modules')), function (module) {
	    if (startsWith(module, 'grunt-') && deps.indexOf(module) > -1) {
	        grunt.loadNpmTasks(path.join(path.basename(__dirname), 'node_modules', module));
	    }
	});

	// load customised grunt tasks
	grunt.loadTasks(path.join(currentPluginDir, 'grunt/tasks'));

	// 1. Create a less file with @import for all dependency and the component's less
	// 2. Compile the less into a css file
	// 3. Compile the css file to a minified css file
	grunt.registerTask('component:style', ['less:component']);
	grunt.registerTask('component:docs', ['assemble:component']);

}