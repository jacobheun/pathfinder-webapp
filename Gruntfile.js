module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    bower: {
      install: {
        options: {
          targetDir: './public/javascripts/libs'
        }
      }
    },

    clean: ["./dist"],
    mkdir: {
      dist: {
        options: {
          create: ['./dist']
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    concurrent: {
      tests: ['karma:unit', 'karma:e2e']
    },
    develop: {
      developServer: {
        file: 'app.js'
      },
      distServer: {
        file: 'app.js',
        env: { NODE_ENV: 'dist' }
      }
    },
    exec: {
      makeDist: {
        cmd: 'rm -rf dist && mkdir dist'
      }
    },
    karma: {
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'public',
            dest: 'dist',
            src: [
              './**'
            ]
          }
        ]
      }
    },
    watch: {
      all: {
        files: ["views/**", "resources/**", "public/images/**", "public/javascripts/**"],
        tasks: ["liveReload"],
        options: {
          nospawn: true,
          interrupt: false,
          debounceDelay: 250
        }
      }
    },
    reload: {
      port: 36729,
      liveReload: {},
      proxy: {
        host: "localhost",
        port: 8181
      }
    }
  });

  grunt.registerTask('default', [
    'bower:install',
    'copy:dist'
  ]);

  grunt.registerTask("liveReload", ["reload", "watch"])

  grunt.registerTask("dev", ["develop:developServer","liveReload"]);

  grunt.registerTask('dist', [
    'develop:distServer',
    'clean',
    'mkdir:dist',
    'copy:dist',
    'karma:e2e'
  ]);

  grunt.registerTask("install", ["bower:install"]);

  grunt.registerTask('test', [
    'develop:developServer',
    'concurrent:tests'
  ]);

  grunt.registerTask('e', [
    'karma:e2e'
  ]);

};