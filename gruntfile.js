module.exports = function(grunt) {
    grunt.initConfig({
        tslint: {
			options: {
				configFile: 'tslint.json'
			},
			validate: ['src/**/*.ts']
		}
    });
    grunt.loadNpmTasks('grunt-tslint');