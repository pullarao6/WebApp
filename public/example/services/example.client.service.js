angular.module('example').service('Calculator',function(){
	this.square = function(a){return a*a};
	this.cube = function(a){return a*a*a};
});