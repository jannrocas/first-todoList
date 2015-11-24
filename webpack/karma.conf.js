/*
  Integration:
  - npm install --save-dev karma karma-chai karma-chrome-launcher karma-firefox-launcher karma-mocha karma-phantomjs-launcher karma-sinon-chai karma-sourcemap-loader karma-webpack sinon sinon-chai
  - create karma.conf.js
  - create webpack.test.config.js
  - create index.js inside ./test
  - update package.json "test": "cd ./src && ../node_modules/karma/bin/karma start karma.conf.js"
*/

// Karma configuration

var webpackConfig = require('./webpack.test.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js', // This is a polyfill for function.prototype.bind which is missing from PhantomJS.
      'test/index.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-chai',
      'karma-sinon-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'], // progress


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // Chrome PhantomJS Firefox


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // to avoid DISCONNECTED messages (e.g. Disconnected (1 times), because no message in 10000 ms., etc)
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 60000 //default 10000
  })
};
