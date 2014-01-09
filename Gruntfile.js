module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") Created with MEAN stack by Wolfram Creative http://woflframcreative.com %> */\n'
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
    compass: {   
        dev: { 
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                specify: 'src/sass/style.scss',
                sassDir: 'src/sass/',
                cssDir: 'www/css/'
            }
        }
    },
    watch: {
        scripts: {
            files: ['src/**/*.js', '*.js', 'src/**/*.scss'],
            tasks: ['concat', 'compass'],
            options: {
                spawn: false,
                livereload: true
            },
        },
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
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  // Default task(s).
  grunt.registerTask('server', ['concurrent:dev']);
  grunt.registerTask('default', ['compass', 'concat', 'uglify']);


};