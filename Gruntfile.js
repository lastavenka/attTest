module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      style: {
        files: {
          'build/css/style.css': ['source/less/style.less']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 11']
      },
      style: {
        src: 'build/css/style.css'
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: 'gzip'
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'source',
            src: ['img/*.*', 'types/*.*', 'index.html', 'bower_components'],
            dest: 'build'
          }
        ]
      },

      buildHTML: {
        files: [
          {
            expand: true,
            cwd: 'source',
            src: ['index.html'],
            dest: 'build'
          }
        ]
      }
    },

    clean: {
      build: ['build']
    },

    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['source/js/*.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },

      scripts: {
        files: ['source/js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },

      less: {
        files: ['source/less/**/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          spawn: false
        }
      },

      html: {
        files: ['source/index.html'],
        tasks: ['copy:buildHTML'],
        options: {
          spawn: false
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'uglify',
    'less',
    'autoprefixer',
    'cssmin'
  ]);
  grunt.loadNpmTasks('grunt-contrib-watch');
};
