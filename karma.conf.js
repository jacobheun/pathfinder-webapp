

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'public/javascripts/libs/angular/angular.js',
      'public/javascripts/libs/angular-mocks/angular-mocks.js',
      'public/javascripts/libs/underscore/underscore-min.js',
      'public/javascripts/app.js',
      'public/javascripts/filters/chatFilter.js',
      'public/javascripts/controllers/chatcontroller.js',
      './test/**/*.js'
    ],

    urlRoot: '/__karma/',

    autoWatch: true,

    proxies: {
      '/': 'http://localhost:3000/'
    },

    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    reporters: ['dots'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};