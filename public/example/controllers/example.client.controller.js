angular.module('example').controller('ExampleController', ['$scope', 'Calculator',
function($scope, Calculator) {
	//console.log(Authentication.user);
	//$scope.name = Authentication.user ? Authentication.user.name :'MEAN Application';
	$scope.name="MEAN";
	$scope.doSquare = Calculator.square($scope.number);
	
	$scope.doCube = Calculator.cube($scope.number);
}
]);