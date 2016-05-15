var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName
, ['ngRoute', 'ngResource', 'users']);


angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});

angular.module(mainApplicationModuleName)
		.controller('MainController',['$scope','$localStorage','$location','UserService','Auth',
			function($scope,$localStorage,$location,UserService,Auth){
				 if($localStorage.token){
				 		$scope.tokenClaims = UserService.getTokenClaims();
						console.log($scope.tokenClaims);
				 }
				 $scope.logout = function(){
					    console.log("Logging out");
					 		Auth.logout(function(){
								$scope.token = $localStorage.token;
								$scope.tokenClaims = Auth.getTokenClaims();
								console.log($scope.tokenClaims);
								$location.path('/');
							});
				 }
}]);

angular.module(mainApplicationModuleName).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

angular.module(mainApplicationModuleName).config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '/views/home.html',
		controller : 'MainController'
	})
} ]);
