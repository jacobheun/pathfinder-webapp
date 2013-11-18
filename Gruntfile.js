module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-reload");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.initConfig({
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
    develop: {
      server: {
        file: 'app.js'
      }
    },
    exec: {
      makeDist: {
        cmd: 'rm -rf dist && mkdir dist'
      },
      bower: {
        cmd: 'bower install'
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
        files: ["/views/**/*", "resources/**/*", "vendor/**/*", "public/images/**/*", "public/javascripts/**/*"],
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
    'exec:bower',
    'copy:dist'
  ]);

  grunt.registerTask("liveReload", ["reload", "watch"])

  grunt.registerTask("dev", ["develop","liveReload"]);

  grunt.registerTask('dist', [
    'bower',
    'develop',
    'clean',
    'mkdir:dist',
    'copy:dist',
    'karma:e2e'
  ]);

  grunt.registerTask('test', [
//    'clean:server',
//    'concurrent:test',
//    'connect:test',
//    'neuter:app',
    'karma:unit'
  ]);

  grunt.registerTask('e', [
    'karma:e2e'
  ]);

};