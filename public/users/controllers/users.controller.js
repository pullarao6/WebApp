angular.module('users')
	.controller('signupController',['$scope', '$location', '$localStorage', 'UserService',
	       function($scope, $location, $localStorage, UserService){
				function successAuth(res) {
		            $localStorage.token = res.token;
								console.log("Yahoooooooo");
		            window.location = "/users/signin";
				}
				$scope.signupSubmit = function(){
					var formData = $scope.person;
					UserService.signup(formData, successAuth, function (data,status,headers) {
		                   $scope.message = data.reason;
		               });
				};
				$scope.token = $localStorage.token;
		    $scope.tokenClaims = UserService.getTokenClaims();
}]);

angular.module('users')
	.controller('signinController',['$scope', '$location', '$localStorage', 'Auth',
            function($scope, $location, $localStorage, Auth){
				function successAuth(res) {
		            $localStorage.token = res.token;
		            $scope.message='';
		            console.log('token::'+res.token);
		            window.location = "/";
				}
				$scope.signinSubmit = function(){
					var formData = $scope.person;
					Auth.signin(formData,successAuth,function () {
		                   $scope.message = 'Invalid credentials.';
		               });
				};
				$scope.token = $localStorage.token;
		  	$scope.tokenClaims = Auth.getTokenClaims();
				console.log($scope.tokenClaims);
}]);

angular.module('users')
	.controller('dashboardController',['$scope','$routeParams','UserService',function($scope,$routeParams,UserService){
				$scope.user = UserService.get(UserService.getTokenClaims().manfid,function(res){$scope.user = res;console.log(res);},function(errorRes){console.log(":::"+errorRes);});
}]);
