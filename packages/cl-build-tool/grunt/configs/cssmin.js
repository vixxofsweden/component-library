module.exports = function(grunt) {
	var config = {
		component: {
			files: [
				{
					expand: true,
					cwd: 'dist',
					src: ['*.css'],
					dest: 'dist',
					ext: '.min.css'
				}
			]
		},
		theme: {
			files: [
				{
					expand: true,
					cwd: 'dist',
					src: ['**/*.css'],
					dest: 'dist',
					ext: '.min.css'
				}
			]
		},
		full: {
			files: [
				{
					expand: true,
					cwd: 'dist',
					src: ['*.css'],
					dest: 'dist',
					ext: '.min.css'
				}
			]
		}
	};

	return config;
}