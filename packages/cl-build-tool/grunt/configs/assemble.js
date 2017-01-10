var path = require('path');

module.exports = function(grunt) {

	// The template and helpers are coming from the grunt-package
	var componentTemplate = path.join(__dirname, '../../templates/component.hbs');
	var exportTemplate = path.join(__dirname, '../../templates/export.hbs');
	var helpersDir = path.join(__dirname, '../../helpers/*.js');

	// The partials and data are coming from the component itself
	var current = process.cwd();
	var partialsDir = path.join(current, 'src', 'partials/*.hbs');
	var dataDir = path.join(current, 'config/*.yml');
	var pkg = grunt.file.readJSON('package.json');

	if (grunt.option('brand')) {
        var singleBrand = grunt.option('brand');
    }

	var config = {
		component: {
			options: {
			     partials: ['src/partials/*.hbs', 'src/config/*.hbs'],
			     helpers: ['handlebars-helper-md', helpersDir],
			     data: ['src/config/*.yml', 'package.json'],
			     ext: '.hbs'
		    },
		    files: [
		   		{
					expand: true,
					src: componentTemplate,
					dest: 'dist',
					rename: function(src, dest) {
						console.log(path.join(current, 'dist', pkg.name));
						return path.join(current, 'dist', pkg.name);
					}
				},
		    ]
		},
		export: {
			options: {
			     partials: ['dist/*.hbs'],
			     helpers: ['handlebars-helper-md', helpersDir],
			     data: ['src/config/*.yml'],
			     brand: singleBrand
		    },
		    files: {
			    'dist/index': exportTemplate
		    }
		}
	}

	return config;
}