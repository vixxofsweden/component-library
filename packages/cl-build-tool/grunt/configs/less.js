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
					cwd: 'src',
					src: ['*/less/*.dist.less'],
					dest: 'dist',
					ext: '.css',
					rename: function(dest, src) {
						var path = dest + '/' + src;
						return path.replace('less', '');
					}
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