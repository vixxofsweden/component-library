module.exports = function(grunt) {
	var config = {
		docs: {
			files: [
				{
					expand: true,
					cwd: 'src/less',
					src: ['*.source.less'],
					dest: 'dist/css',
					ext: '.css'
				}
			]
		}
	};

	return config;
}