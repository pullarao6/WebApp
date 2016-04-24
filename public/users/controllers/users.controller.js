angular.module('users')
	.controller('signupController',['$scope', '$location', '$localStorage', 'Auth',
	       function($scope, $location, $localStorage, Auth){
				function successAuth(res) {				
		            $localStorage.token = res.token;
		            window.location = "/";
				}	
				$scope.signupSubmit = function(){					
					var formData = $scope.person;
					Auth.signup(formData, successAuth, function (data,status,headers) {
		                   $scope.message = data.reason;
		               });
				};
				$scope.token = $localStorage.token;
		        $scope.tokenClaims = Auth.getTokenClaims();
}]);

angular.module('users')
	.controller('signinController',['$scope', '$location', '$localStorage', 'Auth',
            function($scope, $location, $localStorage, Auth){			
				function successAuth(res) {
					console.log(res._id);
		            $localStorage.token = res.token;
		            $scope.message='';
		            console.log('token::'+res.token);
		            //window.location = "/";
				}
				$scope.signinSubmit = function(){
					var formData = $scope.person;
					console.log(formData.username);
					Auth.signin(formData,successAuth,function () {
		                   $scope.message = 'Invalid credentials.';
		               });	
				};
				$scope.token = $localStorage.token;
		        $scope.tokenClaims = Auth.getTokenClaims();
}]);