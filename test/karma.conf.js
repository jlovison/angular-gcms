module.exports = function(config) {
  config.set({
    basePath : './../',
    files: [
      'bower_components/angular/angular.js',  
      'bower_components/angular-mocks/angular-mocks.js',
      './angular-gcms.js',
      'test/unit/*.js'
    ], 
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-jasmine', 
      'karma-firefox-launcher', 
      'karma-chrome-launcher', 
      'karma-phantomjs-launcher'
    ]
  });
}
