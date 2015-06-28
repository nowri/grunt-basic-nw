module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        /*
         * Initial setting
         * */
        dirs: {
            deploy: 'deploy',
            release: '_release',
            src: 'src'
        },

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            toRelease: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.deploy %>',
                    src: ['**'],
                    dest: '<%= dirs.release %>'
                }],
                dot: true
            }
        },

        clean: {
            allRelease: ['<%= dirs.release %>/**']
        },

        watch: {
            deploy: {
                files: ['<%= dirs.src %>/**'],
                tasks: ['deploy']
            },

            release: {
                files: ['<%= dirs.src %>/**'],
                tasks: ['release']
            }
        }

        /*
         * Custom setting
         * */
        /* Tasks from here */

    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('commonBefore', [/* Common tasks here */]);
    grunt.registerTask('deploy', ['commonBefore' /* Deploy tasks here */]);
    grunt.registerTask('release', ['commonBefore', 'clean:allRelease', 'copy:toRelease'/* Release tasks here */]);
    grunt.registerTask('default', ['release']);
};
