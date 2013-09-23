/*global module */
module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                preserveComments: false,
                banner: "/* <%= pkg.name %> v<%= pkg.version %> (<%= pkg.repository.url %>) */\n"
            },
            query: {
                files: {
                    "query-<%= pkg.version %>.min.js" : [ "query-<%= pkg.version %>.js" ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", [ "build" ]);
    grunt.registerTask("build", [ "uglify" ]);
};
