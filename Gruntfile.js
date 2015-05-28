module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		/*
		 * 初期設定
		 * */
		dirs	: {
			deploy	:	'deploy',
			release	:	'_release',
			src		:	'src'
		},

		pkg		:	grunt.file.readJSON('package.json'),

		copy	:	{
			toRelease : {
				files : [{
					expand : true,
					cwd : '<%= dirs.deploy %>',
					src : ['**'],
					dest : '<%= dirs.release %>'
				}],
				dot : true
			}
		},

		clean : {
			allRelease : ['<%= dirs.release %>/**']
		},

		watch : {
			deploy : {
				files : ['<%= dirs.src %>/**'],
				tasks : ['deploy']
			},

			release : {
				files : ['<%= dirs.src %>/**'],
				tasks : ['release']
			}
		}

		/*
		 * カスタム設定
		 * */
		/* ここからタスク記述 */

	});


	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('commonBefore', 	[/* ここに共通タスクネーム記述 */]);
	grunt.registerTask('deploy', 		['commonBefore' /* ここにdeploy専用タスクネーム記述 */]);
	grunt.registerTask('release', 		['commonBefore', 'clean:allRelease', 'copy:toRelease'/* ここにrelease専用タスクネーム記述 */]);
	grunt.registerTask('default', 		['release']);
};
