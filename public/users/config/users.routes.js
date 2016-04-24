angular.module('users').config([ '$routeProvider', '$httpProvider', function($routeProvider,$httpProvider) {	
	$routeProvider.when('/users/signup', {		
		templateUrl : 'users/views/users.view.signup.html',
		controller : 'signupController'
	});
	$routeProvider.when('/users/signin', {		
		templateUrl : 'users/views/users.view.signin.html',
		controller : 'signinController'
	});
	
	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
		   return {
		       'request': function (config) {
		           config.headers = config.headers || {};
		           if ($localStorage.token) {
		               config.headers.Authorization = 'Bearer ' + $localStorage.token;
		           }
		           return config;
		       }
		       /*'responseError': function (response) {
		           if (response.status === 401 || response.status === 403) {
		               //$location.path('/users/signin');
		           }
		           return $q.reject(response);
		       }*/
		   };
		}]);
} ]);

angular.module('users').constant('urls', {
    BASE: 'http://localhost:8080',
    BASE_API: 'http://localhost:8080/api/users'
})