module.exports = function (grunt) {

	grunt.initConfig({
		jshint: {
			scripts: ["js/*.js", "!js/RoomReservation.js"]
		},
		csslint: {
			src: ["css/*.css", "!css/style.css"]
		},
		htmlhint: {
			src: ["index.html"]
		},
		clean: {
			options: { force: true },
			prevRelease: ["./../GruntDemo-release/*"],
			buildFiles: ["./../gruntDemo.js"]
		},
		copy: {
			files: {
				src: ["**/*", "!gruntfile.js", "!**/node_modules/**", "!**/js/*.js", "!index.html"],
				dest: "./../GruntDemo-release/"
			}
		},
		concat: {
			options: { seperator: ";" },
			release: {
				src: ["./js/**/*.js", "!./js/libs/**/*"],
				dest: "./../gruntDemo.js"
			}
		},
		uglify: {
			release: {
				files: {
					"./../GruntDemo-release/js/gruntDemo.min.js": ["./../gruntDemo.js"]
				}
			}
		},
		processhtml: {
			release: {
				files: {
					"./../gruntDemo-release/index.html": ["./index.html"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-htmlhint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-processhtml");

	grunt.registerTask("default", ["jshint", "csslint", "htmlhint"]);
	grunt.registerTask("release", ["clean:prevRelease", "copy", "concat", "uglify",
		"processhtml", "clean:buildFiles"]);
};