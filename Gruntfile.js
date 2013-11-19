module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks("grunt-reload");

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
    concurrent: {
      tests: ['karma:unit', 'karma:e2e']
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
    'exec:bower',
    'copy:dist'
  ]);

  grunt.registerTask("liveReload", ["reload", "watch"])

  grunt.registerTask("dev", ["develop","liveReload"]);

  grunt.registerTask('dist', [
    'develop',
    'clean',
    'mkdir:dist',
    'copy:dist',
    'karma:e2e'
  ]);

  grunt.registerTask("install", ["exec:bower"]);

  grunt.registerTask('test', [
    'develop',
    'concurrent:tests'
  ]);

  grunt.registerTask('e', [
    'karma:e2e'
  ]);

};