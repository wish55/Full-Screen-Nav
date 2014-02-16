module.exports = function(grunt) {

	grunt.initConfig({

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.fullscreennav.js"],
				dest: "dist/jquery.fullscreennav.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.fullscreennav.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.fullscreennav.js"],
				dest: "dist/jquery.fullscreennav.min.js"
			}
		},

		sass: {
			dist: {
				files: {
					'demo/css/style.css' : 'demo/sass/style.scss'
				}
			}
		},

		watch: {
			scripts: {
        		files: ["src/*.js"],
        		tasks: ["jshint", "concat", "uglify"],
        		options: {
        			spawn: false
        		}
        	},
        	css: {
				files: 'demo/sass/*.scss',
				tasks: ['sass'],
        		options: {
        			spawn: false
        		}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");

	grunt.registerTask("default", ["watch"]);
	grunt.registerTask("travis", ["jshint"]);

};
