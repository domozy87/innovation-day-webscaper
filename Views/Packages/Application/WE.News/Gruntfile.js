'use strict';

module.exports = function (grunt) {

	// Print time to build each grunt task
	require('time-grunt')(grunt);

	// Library to autoinclude necessary grunt tasks (makes building much faster)
	require('jit-grunt')(grunt, {
		replace: 'grunt-text-replace'
	});

	grunt.file.defaultEncoding = 'utf-8';

	// Project configuration.
	grunt.initConfig({
		dirs: {
			private: 'Resources/Private',
			public: 'Resources/Public',
			bower: 'bower_components',
			sass: {
				src: '<%= dirs.private %>/Assets/Sass'
			},
			css: {
				dest: '<%= dirs.public %>/Stylesheets'
			},
			js: {
				src: '<%= dirs.private %>/Assets/JavaScripts',
				dest: '<%= dirs.public %>/JavaScripts'
			},
			fonts: {
				dest: '<%= dirs.public %>/Fonts'
			},
			images: {
				dest: '<%= dirs.public %>/Images'
			},
			vendor: {
				bootstrap: '<%= dirs.bower %>/bootstrap-sass/assets',
				fontAwesome: '<%= dirs.bower %>/font-awesome-sass/assets',
				html5shiv: '<%= dirs.bower %>/html5shiv/dist',
				jquery: '<%= dirs.bower %>/jquery/dist',
				validate: '<%= dirs.bower %>/jquery-validation/dist'
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: '<%= dirs.sass.src %>',
					cssDir: '<%= dirs.css.dest %>',
					outputStyle: 'expanded',
					noLineComments: true,
					importPath: [
						'<%= dirs.vendor.bootstrap %>/stylesheets',
						'<%= dirs.vendor.fontAwesome %>/stylesheets'
					]
				}
			}
		},
		// @TODO Improvement if this package is fully SASS
		// @see http://gustavohenke.github.io/jquery-ui-bootstrap/
		// @see https://github.com/gustavohenke/jquery-ui-bootstrap
		replace: {
			jqueryUiBootstrap: {
				src: '<%= dirs.vendor.jqueryUiBootstrap %>/jquery.ui.theme.css',
				overwrite: true,
				replacements:[{
					from: 'images/',
					to: '../Images/'
				}, {
					from: '"Helvetica Neue", Helvetica, Arial',
					to: '\'Lato\''
				}]
			}
		},
		concat: {
			css: {
				src: [
					'<%= dirs.vendor.jqueryUi %>/themes/base/jquery-ui.min.css',
					'<%= dirs.vendor.jqueryUiBootstrap %>/jquery.ui.theme.css',
					'<%= dirs.vendor.tokenize %>/jquery.tokenize.css',
					'<%= dirs.css.dest %>/Application.css'
				],
				dest: '<%= dirs.css.dest %>/Application.css'
			},
			js: {
				src: [
					'<%= dirs.vendor.jquery %>/jquery.js',
					'<%= dirs.vendor.jqueryUi %>/jquery-ui.js',
					'<%= dirs.vendor.tokenize %>/jquery.tokenize.js',
					'<%= dirs.vendor.validate %>/jquery.validate.js',
					'<%= dirs.vendor.moment %>/min/moment.min.js',
					'<%= dirs.vendor.combodate %>/combodate.js',
					'<%= dirs.vendor.bootstrap %>/javascripts/bootstrap.js',
					'<%= dirs.js.src %>/*.js'
				],
				dest: '<%= dirs.js.dest %>/Application.js'
			}
		},
		uglify: {
			app: {
				files: {
					'<%= dirs.js.dest %>/application.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		cssmin: {
			app: {
				files: [{
					src: '<%= dirs.css.dest %>/Application.css',
					dest: '<%= dirs.css.dest %>/application.min.css'
				}]
			}
		},
		copy: {
			fonts: {
				files: [{
					expand: true,
					flatten: true,
					src: [
						'<%= dirs.vendor.bootstrap %>/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}',
						'<%= dirs.vendor.fontAwesome %>/fonts/font-awesome/*.{eot,svg,ttf,woff,woff2,otf}'
					],
					dest: '<%= dirs.fonts.dest %>'
				}]
			},
			jsHtml5shiv: {
				expand: true,
				cwd: '<%= dirs.vendor.html5shiv %>',
				src: '*.min.js',
				dest: '<%= dirs.js.dest %>'
			}
		},
		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['build']
			},
			sass: {
				files: ['<%= dirs.sass.src %>/**/*.scss'],
				tasks: ['compass', 'concat:css', 'cssmin']
			},
			js: {
				files: ['<%= dirs.js.src %>/**/*.js'],
				tasks: ['concat:js', 'uglify']
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['build', 'watch']);

	// Build task.
	grunt.registerTask('build', ['compass', 'replace', 'concat', 'uglify', 'cssmin', 'copy']);
};
