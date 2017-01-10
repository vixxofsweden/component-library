module.exports = function(grunt) {
	var config = {
		component: {
			files: [
				{
					expand: true,
					cwd: 'src/less',
					src: ['*.dist.less'],
					dest: 'dist',
					ext: '.css'
				}
			]
		},
		theme: {
			files: [
				{
					expand: true,
					cwd: 'src/less',
					src: ['**/*.dist.less'],
					dest: 'dist',
					ext: '.css'
				}
			]
		},
		full: {
			files: [
				{
					expand: true,
					cwd: 'src/less',
					src: ['*.dist.less'],
					dest: 'dist',
					ext: '.css'
				}
			]
		}
	};

	return config;
}