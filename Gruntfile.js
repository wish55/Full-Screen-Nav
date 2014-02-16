module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("fullscreennav.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.fullscreennav.js"],
				dest: "dist/jquery.fullscreennav.js"
			},
			options: {
				banner: "<%= meta.banner %>"
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
			},
			options: {
				banner: "<%= meta.banner %>"
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
