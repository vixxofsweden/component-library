var path = require('path');
var _ = require('underscore');
var utils = require('../../lib/utils.js');

// This one only needs to be run the first time a component is added
// or if a component has new/other dependencies

module.exports = function(grunt) {

	var node_modules = path.join(process.cwd(), 'node_modules');
	var pkg = grunt.file.readJSON('package.json');
	var dependencies = pkg.dependencies;

	// --------- COMPONENT

	// Get the dependencies
	var componentSources = [];

	_.each(dependencies, function(version, component) {
		if (utils.startsWith(component, 'cl-component-')) {
		    var src = path.join(node_modules, component, 'src/less/*.dist.less');
		    componentSources.push(src);
		}
	});

	// After adding all dependencies we add the components less
	componentSources.push('src/less/*.source.less');

	// Name the files the same as the package name
	var componentDest = path.join('src/less', pkg.name + '.dist.less');


	// --------- THEME
	// 1. For each component
	// 1.1 For each dependency of the component

	var themeConfig = [];

	// For each component dependency - this is the theme dependencies
	_.each(dependencies, function(version, component) {
		if (utils.startsWith(component, 'cl-component-')) {

			// Example: _component = cl-component-buttons

			// The path to the single dependency
			// Example: cl-theme-light/node_modules/cl-component-buttons
			var dependency = path.join(node_modules, component);

			// The dependencies of the dependency
			// Example cl-component-base is a dependency of cl-component-buttons
			var depDependencies = grunt.file.readJSON(path.join(dependency, 'package.json')).dependencies;

			var sources = [];

			// Add the component less. This file already has any dependencies to
			// default brand in it
			sources.push(path.join(dependency, 'src/less', '*.dist.less'));

			// For every dependency of _component we want the theme less
			// Example: _depSrc = cl-theme-light/less/cl-component-base/dist/*.dist.less
			_.each(depDependencies, function(version, component) {
				if (utils.startsWith(component, 'cl-component-')) {
					var depSrc = path.join('src', component, 'less', '*.source.less');
					sources.push(depSrc);
				}
			});

			// Add the component's less to the array
			// Example: less/cl-component-button/*.source.less
			sources.push(path.join('src', component, 'less', '*.source.less'));

			// Example: src/less/cl-component-buttons/cl-component-buttons.dist.less
			var dest = path.join('src', component, 'less', component + '.dist.less');

			var config = {
				src: sources,
				dest: dest
			};

			themeConfig.push(config);
		}
	});

	// --------- FULL
	// Grab all dependencies of a component

	var fullThemeSrc = [];

	_.each(dependencies, function(version, component) {

		// TODO: Use node glob instead
		if (utils.startsWith(component, 'cl-component-')) {
		    var themeSrc = path.join('src', component, 'less', '*.source.less');
		    var componentSrc = path.join(node_modules, component, 'src/less', '*.source.less');
		    fullThemeSrc.push(componentSrc);
		    fullThemeSrc.push(themeSrc);
		}
	});

	var config = {
		    options: {
	            inlineCSS: false
	        },
	        component: {
	            src: componentSources,
	            dest: componentDest
	        },
	        theme: {
	        	files: themeConfig
	        },
	        full: {
	        	src: fullThemeSrc,
	        	dest: 'src/full.dist.less'
	        }
	};

	return config;

}