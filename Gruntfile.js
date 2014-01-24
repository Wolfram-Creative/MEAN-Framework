module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> Created with MEAN stack by Wolfram Creative http://woflframcreative.com */\n'
      },
      build: {
        src: 'www/js/app.js',
        dest: 'www/js/app.min.js'
      }
    },
    concat: {   
        dev: {
            src: ['src/app/app.js', 'src/app/router.js','src/app/**/*.js'],
            dest: 'www/js/app.js'
        }
    },
    less: {
        dev: {
            options: {
                paths: ["less"],
                dumpLineNumbers: 'comments'
            },
            files: {
                "www/css/style.less": "src/sass/style.less",
            }
        },
        prod: {
            options: {
                paths: ["less"],
                compress: true
            },
            files: {
                 "www/css/style.less": "src/sass/style.less",
            }
        }
    },
    watch: {
        scripts: {
            files: ['src/**/*.js', '*.js', 'src/**/*.less'],
            tasks: ['concat'],
            options: {
                spawn: false,
                livereload: true
            },
        },
        styles: {
            files: ['src/**/*.less'],
            tasks: ['less'],
            options: {
                spawn: false,
                livereload: true
            },
        }
    },
    nodemon: {
      dev: {
          options: {
              file: 'server.js',
              watchedExtensions: ['js'],

              delayTime: 1,
              legacyWatch: true,
              env: {
                  PORT: '3000'
              },
              cwd: __dirname
          }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  // Default task(s).
  grunt.registerTask('server', ['concurrent:dev']);
  grunt.registerTask('default', ['less', 'concat', 'uglify']);


};