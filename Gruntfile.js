module.exports = function(grunt) {

  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long grunt task take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //Configure grunt
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    //js uglify
    uglify: {
             options: {
             },
             dist: {
                 files: {
                     '/public/component/base/dialog/dialog.min': 'public/component/base/dialog/dialog'
                 }
             }
         },

    /*//sass setting
    sass: {
        dist: {
            files: {
                'css/person.css': 'css/person.scss'
            },
            options: {
                sourcemap: 'true'
            }
        }
    },*/

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729 // This does not perform live reloading. this port is used by watch task to trigger a live reloading action.
      },
      all: {
        options: {
          open: true,
          base: [
            '.'
          ]
        }
      }
    },

    //Watch files for changes, and run tasks base on the changed files.
    watch: {

      /*sass: {
                 files: ['css/*.scss'],
                 tasks: ['sass'],
                 options: {
                     livereload: true
                 }
             },*/

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>' // this port must be same with the connect livereload port
        },
        // Watch whatever files you needed.
        files: [
          '*.html','public/**/*.js','css/*.css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Creates the 'serve' task
  grunt.registerTask('serve', [
    'connect:all',
    'watch'
  ]);

  grunt.registerTask('uglify', [
    'uglify'
  ]);

};