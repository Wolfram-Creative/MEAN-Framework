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
        dest: 'www/js/app.js'
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
                "www/css/style.css": "src/less/style.less",
            }
        },
        prod: {
            options: {
                paths: ["less"],
                compress: true
            },
            files: {
                 "www/css/style.css": "src/less/style.less",
            }
        }
    },
    watch: {
        scripts: {
            files: ['src/**/*.js', '*.js'],
            tasks: ['concat'],
            options: {
                spawn: false,
                livereload: true
            },
        },
        styles: {
            files: ['src/less/*.less', 'src/less/**/*.less'],
            tasks: ['less:dev'],
            options: {
                spawn: false,
                livereload: true
            },
        },
        sprites: {
            files: ['src/img/icon/*.png'],
            tasks: ['sprite', 'less:dev']
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
    },
    sprite: {
      icon: {
        src: 'src/img/icon/*.png',
        destImg: 'www/img/sprites/sprites_icon.png',
        destCSS: 'src/less/sprites/icon.less',
        imgPath: '/img/sprites/sprites_icon.png',
        algorithm: 'binary-tree',
        padding: 50,
        engine: 'auto',
        cssFormat: 'css',
        cssOpts: {
          'functions': false,
          'cssClass': function (item) {
            return '.icon-' + item.name;
          }
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
  grunt.loadNpmTasks('grunt-spritesmith');


  // Default task(s).
  grunt.registerTask('server', ['concurrent:dev']);
  grunt.registerTask('default', ['sprite','less:dev', 'concat', 'uglify']);
  grunt.registerTask('prod', ['sprite', 'less:prod', 'concat', 'uglify']);


};