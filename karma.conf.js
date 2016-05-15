module.exports = function(config) {
config.set({
frameworks: ['jasmine'],
files: ['public/lib/angular/angular.js',
'public/lib/angular-resource/angular-resource.js',
'public/lib/angular-route/angular-route.js',
'public/lib/angular-mocks/angular-mocks.js',
'public/sample-test.js'
],
reporters: ['progress'],
browsers: ['PhantomJS'],
captureTimeout: 60000,
singleRun: false,
autoWatch: true,
logLevel: config.LOG_INFO
});
};
