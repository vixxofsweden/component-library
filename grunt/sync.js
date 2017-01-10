module.exports = {
	partials: {
		files: [
			{
				expand: true,
				flatten:true,
				cwd: 'packages',
				src: ['*/dist/cl-*.hbs'],
				dest: 'dist/partials'
			}
		]
	}
}