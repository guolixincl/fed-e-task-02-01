const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = (grunt) => {
	grunt.initConfig({
		clean: {
			all: 'dist/**'
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: [ 'public/**' ],
						dest: 'dist/'
					},
					{
						expand: true,
						cwd: 'src',
						src: [ 'assets/images/**' ],
						dest: 'dist/'
					},
					{
						expand: true,
						cwd: 'src',
						src: [ 'assets/fonts/**' ],
						dest: 'dist/'
					}
				]
			}
		},
		swig: {
			options: {},
			main: {
				expand: true,
				cwd: 'src',
				dest: 'dist/',
				src: [ '*.html' ],
				ext: '.html'
			}
		},
		sass: {
			options: {
				implementation: sass
			},
			main: {
				files: [
					{
						expand: true,
						cwd: 'src',
						src: [ 'assets/styles/*.scss' ],
						dest: 'dist',
						ext: '.css'
					}
				]
			}
		},
		babel: {
			options: {
				presets: [ '@babel/preset-env' ]
			},
			main: {
				files: {
					'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
				}
			}
		},
		//压缩HTML
		htmlmin: {
			options: {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true
			},
			html: {
				files: [ { expand: true, cwd: 'dist', src: [ '*.html' ], dest: 'dist/' } ]
			}
		},
		cssmin: {
			main: {
				options: { report: 'gzip' },
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: [ 'assets/styles/*.css' ],
						dest: 'dist'
					}
				]
			}
		},
		uglify: {
			main: {
				options: {},
				files: [
					{
						expand: true,
						cwd: 'dist',
						src: [ 'assets/scripts/*.js' ],
						dest: 'dist'
					}
				]
			}
		},
		'http-server': {
			dev: {
				root: 'dist',
				port: 9000,
				ext: 'html',
				openBrowser: true
			}
		},
		watch: {
			js: {
				files: [ 'src/assets/scripts/*.js' ],
				task: [ 'babel' ]
			},
			css: {
				files: [ 'src/assets/styles/*.scss' ],
				task: [ 'sass' ]
			}
		}
	})

	grunt.registerTask('compile', [ 'babel', 'sass', 'swig' ])
	grunt.registerTask('build', [ 'babel', 'sass', 'swig', 'copy', 'cssmin', 'htmlmin', 'uglify' ])
	grunt.registerTask('start', [ 'babel', 'sass', 'watch' ])
	grunt.registerTask('serve', [ 'build', 'http-server' ])

	loadGruntTasks(grunt)
}
