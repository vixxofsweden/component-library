module.exports = function (grunt) {

    if (grunt.option('brand')) {
        var singleBrand = grunt.option('brand');
    }

    grunt.task.registerTask('build', 'All the magic', function () {
    	// What do we want to do?

    	// CASE 1: We are in a component
    	// 1. Grab each dependency and either:
    	//	1.1 @import them?
    	// 2. Compile to a less dist file

    	// CASE 2: We are in a theme

    	// Per component in this theme we want to:
    	// 1. Grab the less file from the dependency in node_modules
    	// 	  How do we handled those dependencies? Like sg-base. Maybe concat into one less?
    	// 2. Grab the less file from the theme
    	// 3. Compile these into one less file and one css file


        // How do we want to run the app?

        // CASE 1: We are in a component
        // component/:component
        // Only include component css
        // Partials need to be copied over

        // CASE 2: We are looking at a theme
        // component/:component?theme=brand
        // Include theme css (it already includes component css)
        // Themes don't have partials (but maybe branding?)

        // Component template will live in build-tool
        // Grabs snippets (patterns?) from component

        // TODO: define grunt tasks in index.js for components
        // TODO: compile ONE file per brand?
    });
};