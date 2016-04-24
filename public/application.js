var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName
, ['ngRoute', 'ngResource', 'users']);


angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});

angular.module(mainApplicationModuleName).config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '/views/home.html'		
	});
} ]);