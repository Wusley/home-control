module.exports = function( grunt ) {

	'use strict';

	var path = 'public/';

	grunt.initConfig( {

		pkg: grunt.file.readJSON( 'package.json' ),

		connect: {

			dev: {

				options: {

					port: 9001,
					hostname: '*',
					open: true

				}

			},
			prod: {

				options: {

					port: 9001,
					hostname: '*',
					open: true

				}

			}

		},
		compass: {

			dev: {

				options: {

					sassDir: 		path + 'sass',
					cssDir: 		path + 'css',
					imagesDir: 		path + 'images',
					relativeAssets: true,
					outputStyle: 	'expanded'

				}

			},
			prod: {

				options: {

					sassDir: 			path + 'sass',
					cssDir: 			path + 'css',
					imagesDir: 			path + 'images/',
					fontDir: 			path + 'fonts',
					relativeAssets: 	true,
					outputStyle: 		'compressed'
 
				}

			}

		},
		csslint: {

			dev: {

				options: {

			      	csslintrc: '.csslintrc'

			    },
				src: [path + 'css/**/*.css']

			}

		},
		jshint: {

			options: {

				jshintrc: 	'.jshintrc',
				ignores: 	['Gruntfile.js', path + 'js/libraries/**/*.js']

			},
			all: ['js/**/*.js']
            
		},
		watch: {

			css: {

				files: [path + 'sass/**/*'],
				tasks: 'build-dev'

			},
			js: {

				files: [path + 'js/**/*']

			}

		},
		clean: {

			target: {

				src: [path + 'css/**/*']

			}

		}

	} );

	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-compass' );
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	/*
	* Watch
	*/
	grunt.registerTask( 'watchs', [ 'watch:css', 'watch:js' ] );

	/*
	* Test
	*/
	grunt.registerTask( 'test', [ 'csslint:dev', 'jshint:all' ] );

	/*
	* Compile
	*/
	grunt.registerTask( 'build-dev', [ 'clean:target', 'compass:dev', 'test' ] );
	grunt.registerTask( 'build-prod', [ 'clean:target', 'compass:prod', 'test' ] );
	
	/*
	* Deploy dev
	*/
	grunt.registerTask( 'run', [ 'build-dev', 'watchs' ] );

	/*
	* Deploy prod
	*/
	grunt.registerTask( 'run-prod', [ 'build-prod', 'watchs' ] );
};